/**
 * Architecture: Cross-Platform Mobile Client (React Native)
 * Domain: Presentation Layer (Mobile Ecosystem)
 * Objective: Consuming the core DDPM APIs engineered in Phase 3.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// Note: Relying on the design tokens engineered in Step 27
import { SemanticColors, Spacing, Typography } from '../../Step-27-UI-UX-Design-Principles/system/design_tokens';

// Interface mapping to the Domain Entity from Step 25
interface ProjectDTO {
    id: string;
    title: string;
    status: 'ACTIVE' | 'ON_HOLD';
    analyticsScore: number;
}

export const ProjectDashboardScreen: React.FC = () => {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulating the API fetch to the Gateway built in Step 16 & 22
        const fetchEnterpriseProjects = async () => {
            try {
                // In production, this utilizes absolute secure URLs
                const response = await fetch('https://api.ddpm.enterprise/v1/projects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Network Fault: Client failed to reach API Gateway', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEnterpriseProjects();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={SemanticColors.primary.base} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Enterprise Dashboard</Text>
            <FlatList
                data={projects}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.statusIndicator}>Status: {item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
};

// Structural styling strictly adhering to the Design System
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SemanticColors.surface.background,
        padding: parseInt(Spacing.md),
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: parseInt(Typography.scale.h1.fontSize),
        fontWeight: '700',
        color: SemanticColors.surface.textPrimary,
        marginBottom: parseInt(Spacing.lg),
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: parseInt(Spacing.md),
        marginBottom: parseInt(Spacing.sm),
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: SemanticColors.primary.base,
    },
    cardTitle: {
        fontSize: parseInt(Typography.scale.h2.fontSize),
        color: SemanticColors.surface.textPrimary,
    },
    statusIndicator: {
        fontSize: parseInt(Typography.scale.caption.fontSize),
        color: SemanticColors.surface.textMuted,
        marginTop: parseInt(Spacing.xs),
    }
});
