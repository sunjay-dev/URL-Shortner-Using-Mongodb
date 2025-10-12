import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_app/screens/copy_container.dart';
import 'package:flutter_app/screens/details.screen.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    checkToken();
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('JWT_TOKEN');
  }

  void checkToken() async {
    final token = await getToken();

    if (token == null || token.isEmpty) {
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  final TextEditingController _urlController = TextEditingController();
  String? shortUrl = "http://localhost:9000/jsjsj";
  final formkey = GlobalKey<FormState>();

  void handleShortURL() async {
    if (!formkey.currentState!.validate()) {
      return;
    }

    final url = _urlController.text;
    final prefs = await SharedPreferences.getInstance();

    try {
      final response = await http.post(
        Uri.parse('http://localhost:9000/'),
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ${prefs.getString('JWT_TOKEN')}',
        },
        body: jsonEncode({'url': url}),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        setState(() {
          shortUrl = "http://localhost:9000/${data["new"]}";
        });
        _urlController.clear();
      } else {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('${data["message"]}')));
      }
    } catch (error) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Network error: $error')));
    }
  }

  void handleLogout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('JWT_TOKEN');

    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Home"), centerTitle: true),
      drawer: Drawer(
        child: ListView(
          children: [
            SizedBox(height: 30),

            ListTile(
              leading: Icon(Icons.home),
              title: Text("Home"),
              onTap: () {},
            ),

            ListTile(
              leading: Icon(Icons.link),
              title: Text("Urls"),
              onTap: () {},
            ),

            ListTile(
              leading: Icon(Icons.insert_chart),
              title: Text("Details"),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => DetailsScreen(
                      longUrl: _urlController.text,
                      shortUrl:
                          "https://sunjay.xyz/abc123", // mock short link for now
                    ),
                  ),
                );
              },
            ),

            ListTile(
              leading: Icon(Icons.logout),
              title: Text("Logout"),
              onTap: handleLogout,
            ),
          ],
        ),
      ),

      body: Form(
        key: formkey,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SizedBox(height: 30),

              Text(
                "Paste your long URL below",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                textAlign: TextAlign.center,
              ),

              SizedBox(height: 20),

              TextFormField(
                controller: _urlController,
                decoration: InputDecoration(
                  hintText: "Enter your URL here",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  prefixIcon: Icon(Icons.link),
                ),
                validator: (value) {
                  if (!value!.startsWith("http")) {
                    return "Please enter a valid url.";
                  }
                  return null;
                },
              ),

              SizedBox(height: 20),

              ElevatedButton(
                onPressed: handleShortURL,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xffffbf00),
                  foregroundColor: Colors.black,
                  padding: EdgeInsets.symmetric(vertical: 15),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: Text("Shorten URL"),
              ),

              SizedBox(height: 20),

              if (shortUrl != null) CopyContainer(shortUrl: shortUrl!),
            ],
          ),
        ),
      ),
    );
  }
}
