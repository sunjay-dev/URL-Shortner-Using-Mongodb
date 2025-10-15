import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  Future<void> _handleLogout(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('JWT_TOKEN');

    Navigator.pushReplacementNamed(context, '/login');

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Logged out successfully")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          const SizedBox(height: 30),

          ListTile(
            leading: const Icon(Icons.home),
            title: const Text("Home"),
            onTap: () {
               Navigator.pop(context);
              Navigator.pushReplacementNamed(context, '/home');
            },
          ),

          ListTile(
            leading: const Icon(Icons.link),
            title: const Text("Urls"),
            onTap: () {
               Navigator.pop(context);
              Navigator.pushNamed(context, '/urls');
            },
          ),

          ListTile(
            leading: const Icon(Icons.insert_chart),
            title: const Text("Details"),
            onTap: () {
               Navigator.pop(context);
              Navigator.pushNamed(context, '/details');
            },
          ),

          const Divider(),

          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text("Logout"),
            onTap: () => _handleLogout(context),
          ),
        ],
      ),
    );
  }
}