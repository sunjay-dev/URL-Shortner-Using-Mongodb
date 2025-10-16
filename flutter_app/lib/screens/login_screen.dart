import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final formkey = GlobalKey<FormState>();

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('JWT_TOKEN');
  }

  @override
  void initState() {
    super.initState();
    checkToken();
  }

  void checkToken() async {
    final token = await getToken();
    if (token != null && token.isNotEmpty) {
      Navigator.pushReplacementNamed(context, '/home');
    }
  }

  void handleLogin() async {
    if (!formkey.currentState!.validate()) {
      return;
    }
    final email = emailController.text.trim();
    final password = passwordController.text.trim();

    try {
      final response = await http.post(
        Uri.parse('https://go.sunjay.xyz/user/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final token = data['token'];

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('JWT_TOKEN', token);

        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Login successful!')));

        Navigator.pushReplacementNamed(context, '/home');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Login failed: ${data["message"]}')),
        );
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
      appBar: AppBar(
        leading: Image.asset("assets/images/logo.png"),
        backgroundColor: Colors.grey[50],
      ),
      body: Form(
        key: formkey,
        child: Padding(
          padding: EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "LOGIN",
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: Color(0xffffbf00),
                ),
              ),

              SizedBox(height: 30),

              TextFormField(
                controller: emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  hintText: 'Enter here',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (!value!.contains("@")) {
                    return "Please enter valid email";
                  }
                  return null;
                },
              ),

              SizedBox(height: 16),

              TextFormField(
                controller: passwordController,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Password',
                  hintText: 'Enter here',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value!.length < 6) {
                    return "Password must be 6 characher long.";
                  }
                  return null;
                },
              ),

              SizedBox(height: 20),

              ElevatedButton(
                onPressed: handleLogin,
                style: ElevatedButton.styleFrom(
                  minimumSize: Size(double.infinity, 50),
                  backgroundColor: Color(0xffffbf00),
                  foregroundColor: Colors.black,
                ),
                child: Text('Login'),
              ),

              SizedBox(height: 10),

              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/signup');
                },
                child: Text("Don't have an account? Sign up"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
