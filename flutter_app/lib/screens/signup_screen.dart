import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController userNameController = TextEditingController();
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

  void handleSignup() async {
    final userName = userNameController.text;
    final email = emailController.text;
    final password = passwordController.text;

    if (!formkey.currentState!.validate()) {
      return;
    }

    try {
      final response = await http.post(
        Uri.parse('http://localhost:9000/user/signup'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': userName,
          'email': email,
          'password': password,
        }),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final token = data['token'];

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('JWT_TOKEN', token);

        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('signup successful!')));

        Navigator.pushReplacementNamed(context, '/home');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('signup failed: ${data["message"]}')),
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
        backgroundColor: Colors.white10,
      ),
      body: Form(
        key: formkey,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "SIGNUP",
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: Color(0xffffbf00),
                ),
              ),

              SizedBox(height: 30),

              TextFormField(
                controller: userNameController,
                decoration: const InputDecoration(
                  labelText: 'UserName',
                  hintText: 'Enter here',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value!.length < 2) {
                    return "Username must be 2 charachers long.";
                  }
                  return null;
                },
              ),

              const SizedBox(height: 16),

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
                    return "Password must be 6 charachers long.";
                  }
                  return null;
                },
              ),

              const SizedBox(height: 20),

              ElevatedButton(
                onPressed: handleSignup,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                  backgroundColor: Color(0xffffbf00),
                  foregroundColor: Colors.black,
                ),
                child: const Text('Sign Up'),
              ),

              const SizedBox(height: 10),

              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/login');
                },
                child: const Text('Already have an account? Login'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
