import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final formkey = GlobalKey<FormState>();

  void handleLogin() async {
    if (formkey.currentState!.validate()) {
      return;
    }
    final email = emailController.text.trim();
    final password = passwordController.text.trim();

    try {
      final response = await http.post(
        Uri.parse('http://localhost:9000/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print('✅ Login successful: $data');

        Navigator.pushReplacementNamed(context, '/home');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Login failed: ${response.body}')),
        );
      }
    } catch (error) {
      print('error: $error');
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Network error: $error')));
    }
  }

  void handleGoogleLogin() {
    print('Login with Google');
    // TODO: open your backend Google auth URL with flutter_web_auth
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Image.asset("assets/images/logo.png"),
        backgroundColor: Colors.white10,
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
                decoration: const InputDecoration(
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
              const SizedBox(height: 16),
              TextFormField(
                controller: passwordController,
                obscureText: true,
                decoration: const InputDecoration(
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
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: handleLogin,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                  backgroundColor: Color(0xffffbf00),
                  foregroundColor: Colors.black,
                ),
                child: const Text('Login'),
              ),
              const SizedBox(height: 10),
              OutlinedButton(
                onPressed: handleGoogleLogin,
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                ),
                child: const Text('Continue with Google'),
              ),
              const SizedBox(height: 10),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/signup');
                },
                child: const Text("Don't have an account? Sign up"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
