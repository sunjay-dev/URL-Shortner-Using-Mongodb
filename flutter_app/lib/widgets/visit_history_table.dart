import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class VisitHistoryTable extends StatelessWidget {
  final List<dynamic> visitHistory;

  const VisitHistoryTable({super.key, required this.visitHistory});

  @override
  Widget build(BuildContext context) {
    if (visitHistory.isEmpty) {
      return const Center(
        child: Text("No visit history found"),
      );
    }

    return SizedBox(
      height: 300,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          columns: const [
            DataColumn(label: Text('Date')),
            DataColumn(label: Text('IP Address')),
            DataColumn(label: Text('Browser')),
            DataColumn(label: Text('OS')),
            DataColumn(label: Text('Device')),
            DataColumn(label: Text('Country')),
            DataColumn(label: Text('City')),
            DataColumn(label: Text('Region')),
          ],
          rows: visitHistory.map((visit) {
            final timestamp = visit['timestamps'] ?? 0;
            final formattedDate = DateFormat('dd/MM/yyyy, HH:mm:ss')
                .format(DateTime.fromMillisecondsSinceEpoch(timestamp));

            return DataRow(
              cells: [
                DataCell(Text(formattedDate)),
                DataCell(Text(visit['ipaddress'] ?? 'Unknown')),
                DataCell(Text(visit['browser'] ?? 'Unknown')),
                DataCell(Text(visit['os'] ?? 'Unknown')),
                DataCell(Text(visit['device'] ?? 'Unknown')),
                DataCell(Text(visit['country'] ?? 'Unknown')),
                DataCell(Text(visit['city'] ?? 'Unknown')),
                DataCell(Text(visit['region'] ?? 'Unknown')),
              ],
            );
          }).toList(),
        ),
      ),
    );
  }
}
