import { useState, useEffect, useRef } from "react";
import { items } from "../api/client";

function DevPage() {
    const [log, setLog] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [pending, setPending] = useState([]);   
    const prevData = useRef(null);
    const removedTimestamps = useRef({});

    useEffect(() => {
        items().then(data => {
            prevData.current = data;
        }).catch(console.error);

        const interval = setInterval(() => {
            items().then(data => {

                // diff and notify logic
                if (prevData.current) {
                    const prevItems = prevData.current.items || {};
                    const prevRemoved = prevData.current.removed || {};
                    const currItems = data.items || {};
                    const currRemoved = data.removed || {};
                

                    //check for new items
                    Object.entries(currItems).forEach(([id, item]) => {
                        if (!prevItems[id]) {
                            setNotifications(prev => [...prev, `New item added: ${item.name}`]);
                            setLog(prev => [...prev, `Added: ${item.name} (ID: ${id})`]);
                        }
                    });
                    Object.entries(currRemoved).forEach(([id, item]) => {
                        if (!prevRemoved[id] && !removedTimestamps.current[id]) {
                            setLog(prev => [...prev, `Removed: ${item.name} (ID: ${id})`]);
                            removedTimestamps.current[id] = Date.now();
                        }
                    });

                    Object.entries(prevRemoved).forEach(([id, item]) => {
                        if (!currRemoved[id]) {
                            setLog(prev => [...prev, `Returned: ${item.name} (ID: ${id})`]);
                            delete removedTimestamps.current[id];
                        }
                    });

                    // pending
                    const pendingEntries = Object.entries(data.pending || {}).map(([key, p]) => ({
                        key,
                        scores: p.scores
                    }));
                    setPending(pendingEntries);

                    prevData.current = data;
                }

            }).catch(console.error);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    
    useEffect(() => {
        const interval = setInterval(() => {
            const newNotifications = [];
            Object.entries(removedTimestamps.current).forEach(([id, timestamp]) => {
                const minutes = Math.floor((Date.now() - timestamp) / 60000);
                if (minutes >= 1) {
                    const item = prevData.current?.removed?.[id];
                    if (item) {
                        newNotifications.push(`${item.name} has been out for ${minutes} minute${minutes > 1 ? "s" : ""}`);
                    }
                }
            });
            setNotifications(newNotifications);
        }, 60000);
        return () => clearInterval(interval);
    }, []);


    return (
        <main className="app">
            <h1>Behind the Scenes</h1>
            <div className="dev-columns">
                <div className="dev-column">
                    <h2>Log</h2>
                    <div className="result">
                        {log.map((entry, index) => (
                            <div key={index}>{entry}</div>
                        ))}
                    </div>
                </div>
                <div className="dev-column">
                    <h2>Notifications</h2>
                    <div className="result">
                        {notifications.map((entry, index) => (
                            <div key={index}>{entry}</div>
                        ))}
                    </div>
                </div>
                <div className="dev-column">
                    <h2>Pending return</h2>
                    <div className="result">
                        {pending.map((entry, index) => (
                            <div key={index}>
                            Return {entry.key}: {JSON.stringify(entry.scores)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DevPage;