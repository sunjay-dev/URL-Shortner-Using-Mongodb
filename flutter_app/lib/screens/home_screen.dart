import 'package:flutter/material.dart';
import 'package:flutter_app/screens/details.screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _urlController = TextEditingController();
  final formkey = GlobalKey<FormState>();

  void handleShortURL() async {
    final url = _urlController.text;

    if (!formkey.currentState!.validate()) {
      return;
    }
    print(url);
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
                  if (!value!.startsWith("http://") ||
                      !value.startsWith("https://")) {
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
            ],
          ),
        ),
      ),
    );
  }
}
