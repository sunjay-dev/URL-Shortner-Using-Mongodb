import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CopyContainer extends StatelessWidget {
  final String shortUrl;

  const CopyContainer({super.key, required this.shortUrl});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(12,4,10,4),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              shortUrl,
              style: const TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          IconButton(
            onPressed: () {
              Clipboard.setData(ClipboardData(text: shortUrl));
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text("Short URL copied!"),
                  duration: Duration(seconds: 1),
                ),
              );
            },
            icon: const Icon(Icons.copy, color: Color(0xffffbf00)),
          ),
        ],
      ),
    );
  }
}
