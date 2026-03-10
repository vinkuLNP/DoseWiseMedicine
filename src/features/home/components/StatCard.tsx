import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  subtext?: string;
}

export function StatCard({
  label,
  value,
  icon,
  color,
  subtext,
}: StatCardProps) {
  const bgColor = `${color}20`;

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: bgColor,
          },
        ]}
      >
        <Text style={[styles.iconText, { color }]}>{icon}</Text>
      </View>

      <View>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
  },
  subtext: {
    marginLeft: 8,
    fontSize: 12,
    color: '#9CA3AF',
  },
});