import 'package:flutter/material.dart';
import 'package:flutter_app/widgets/copy_container.dart';
import 'package:flutter_app/widgets/visit_history_table.dart';

class DetailsScreen extends StatelessWidget {
  final Map<String, dynamic> url;

  const DetailsScreen({super.key, required this.url});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        centerTitle: true,
        title: const Text("URL Details"),
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),
              const Text(
                "Original URL:",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),
              CopyContainer(url: url["redirectUrl"]),

              const SizedBox(height: 30),
              const Text(
                "Shortened URL:",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),
              CopyContainer(url: "https://sunjay.xyz/${url["shortId"]}"),

              const SizedBox(height: 30),
              const Text(
                "Visit History:",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),

              // Table with fixed height and horizontal scrolling
              SizedBox(
                height: 300, // adjust as needed
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: VisitHistoryTable(
                    visitHistory: url['visitHistory'] ?? [],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
