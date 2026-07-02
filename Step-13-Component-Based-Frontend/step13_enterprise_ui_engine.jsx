import React, { useState, useEffect, memo } from 'react';

const useTelemetryStream = (initialData) => {
    const [telemetryFeed, setTelemetryFeed] = useState(initialData);
    useEffect(() => {
        const streamInterval = setInterval(() => {
            setTelemetryFeed(prevFeed => prevFeed.map(node => {
                const weightFluctuation = Math.floor(Math.random() * 800) - 200;
                return node.type === 'WEIGHBRIDGE' ? { ...node, value: Math.max(0, node.value + weightFluctuation) } : node;
            }));
        }, 1500);
        return () => clearInterval(streamInterval);
    }, []);
    return telemetryFeed;
};

const TelemetryNode = memo(({ id, type, value, status }) => {
    const isCritical = (type === 'WEIGHBRIDGE' && value > 40000) || status === 'ERROR';
    return (
        <div style={{ padding: '20px', margin: '10px 0', backgroundColor: '#112240', borderLeft: `5px solid ${isCritical ? '#ff4d4d' : '#64ffda'}`, borderRadius: '8px', color: '#ccd6f6', fontFamily: 'monospace' }}>
            <h4 style={{ color: '#8892b0', margin: 0 }}>{type} | ID: {id}</h4>
            <div style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0', color: isCritical ? '#ff4d4d' : '#ccd6f6' }}>{value.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: isCritical ? '#ff4d4d' : '#64ffda' }}>STATUS: {isCritical ? 'OVERLOAD' : 'NOMINAL'}</div>
        </div>
    );
});

const EnterpriseDashboard = () => {
    const initialNetworkState = [
        { id: "POS_CENTER_01", type: "SMART_POS", value: 1420, status: "ONLINE" },
        { id: "WB_STATION_NORTH", type: "WEIGHBRIDGE", value: 12500, status: "ONLINE" }
    ];
    const liveFeed = useTelemetryStream(initialNetworkState);
    return (
        <div style={{ padding: '40px', backgroundColor: '#0a192f', minHeight: '100vh' }}>
            {liveFeed.map(node => <TelemetryNode key={node.id} {...node} />)}
        </div>
    );
};
export default EnterpriseDashboard;
