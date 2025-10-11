import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void handleLogin() {
    final email = emailController.text;
    final password = passwordController.text;

    print('Login with $email and $password');
    // TODO: Send POST request to your backend
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
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "LOGIN",
              style: TextStyle(
                fontSize: 30, 
                fontWeight: FontWeight.bold,
                color: Color(0xffffbf00)
                ),
            ),
            SizedBox(height: 30),
            TextField(
              controller: emailController,
              decoration: const InputDecoration(
                labelText: 'Email',
                hintText: 'Enter here',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Password',
                hintText: 'Enter here',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: handleLogin,
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(double.infinity, 50),
                backgroundColor: Color(0xffffbf00),
                foregroundColor: Colors.black
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
    );
  }
}
