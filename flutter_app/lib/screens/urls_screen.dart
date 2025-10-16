import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_app/widgets/app_drawer.dart';
import 'package:flutter_app/widgets/url_list_tile.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class UrlsScreen extends StatefulWidget {
  const UrlsScreen({super.key});

  @override
  State<UrlsScreen> createState() => _UrlsScreenState();
}

class _UrlsScreenState extends State<UrlsScreen> {
  @override
  void initState() {
    super.initState();
    _checkToken();
  }

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('JWT_TOKEN');
  }

  void _checkToken() async {
    final token = await _getToken();

    if (token == null || token.isEmpty) {
      if (mounted) {
        Navigator.pushReplacementNamed(context, '/login');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Urls"), centerTitle: true),
      drawer: const AppDrawer(),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 20),
            const Text(
              "See your short URLs below",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),

            Expanded(child: UrlListSection()),
          ],
        ),
      ),
    );
  }
}


class UrlListSection extends StatelessWidget {
  const UrlListSection({super.key});

  Future<List<dynamic>> fetchUrls() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('JWT_TOKEN');

    if (token == null || token.isEmpty) {
      return [];
    }

    try {
      final response = await http.get(
        Uri.parse('http://localhost:9000/api/userUrls/'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200 || response.statusCode == 304) {
        final data = jsonDecode(response.body);
        return data;
      } else {
        throw Exception("Failed to fetch URLs (${response.statusCode})");
      }
    } catch (e) {
      debugPrint("Error fetching URLs: $e");
      throw Exception("Network error occurred");
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<dynamic>>(
      future: fetchUrls(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
         else if (snapshot.hasError) {
          return Center(child: Text("Error: ${snapshot.error}"));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return const Center(child: Text("No URLs found"));
        }

        final urls = snapshot.data!;
        return ListView.builder(
          itemCount: urls.length,
          itemBuilder: (context, index) {
            return UrlListTile(url: urls[index]);
          },
        );
      },
    );
  }
}
