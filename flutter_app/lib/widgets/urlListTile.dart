import 'package:flutter/material.dart';
import 'package:flutter_app/screens/details.screen.dart';

class UrlListTile extends StatelessWidget {
   final Map<String, dynamic> url;

  const UrlListTile({super.key, required this.url});

  @override
  Widget build(BuildContext context) {
    final name = url['name'];
    final shortUrl = url['shortId'];
    final createdAt = url['createdAt'];
    final visitHistory = url['visitHistory'] ?? [];
    final clicks = visitHistory.length;

    return Card(
      color: Colors.white,
      elevation: 2,
      child: InkWell(
        borderRadius: BorderRadius.circular(10),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => DetailsScreen(
                longUrl: url["redirectUrl"],
                shortUrl: "http://localhost:9000/$shortUrl",
              ),
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '🔗 $name',
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.black87,
                    ),
                  ),
                  Text(
                    createdAt,
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ),

              const SizedBox(height: 6),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(shortUrl),
                  Row(
                    children: [
                      Icon(Icons.ads_click_outlined),
                      const SizedBox(width: 4),
                      Text('$clicks'),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
