import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_app/widgets/copy_container.dart';
import 'package:flutter_app/widgets/app_drawer.dart';
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
  final TextEditingController _aliasController = TextEditingController();
  String? shortUrl;
  final formkey = GlobalKey<FormState>();

  void handleShortURL() async {
    if (!formkey.currentState!.validate()) {
      return;
    }

    final url = _urlController.text;
    final alias = _aliasController.text;
    final prefs = await SharedPreferences.getInstance();

    try {
      final response = await http.post(
        Uri.parse('http://localhost:9000/'),
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ${prefs.getString('JWT_TOKEN')}',
        },
        body: jsonEncode({'url': url, 'alias': alias}),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        setState(() {
          shortUrl = "http://localhost:9000/${data["new"]}";
        });
        _urlController.clear();
        _aliasController.clear();
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Home"), centerTitle: true),
     drawer: AppDrawer(),
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

              Row(
                children: [
                  // Left Input (Readonly URL)
                  Expanded(
                    flex: 3,
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.grey[100],
                        border: Border.all(color: Colors.grey.shade300),
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(8),
                          bottomLeft: Radius.circular(8),
                        ),
                      ),
                      child: const Padding(
                        padding: EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 10,
                        ),
                        child: Text(
                          "https://go.sunjay.xyz/",
                          style: TextStyle(fontSize: 16),
                        ),
                      ),
                    ),
                  ),

                  // Right Input (Alias)
                  Expanded(
                    flex: 2,
                    child: TextFormField(
                      controller: _aliasController,
                      decoration: InputDecoration(
                        hintText: "Enter Alias",
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 10,
                        ),
                        border: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey.shade200),
                          borderRadius: const BorderRadius.only(
                            topRight: Radius.circular(8),
                            bottomRight: Radius.circular(8),
                          ),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(
                            width: 2,
                          ),
                          borderRadius: const BorderRadius.only(
                            topRight: Radius.circular(8),
                            bottomRight: Radius.circular(8),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
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
