const fs = require('fs');
const path = require('path');

const historyDir = path.join(process.env.APPDATA, 'Antigravity', 'User', 'History');
// Target time: Before 9:00 AM Today (April 17, 2026 local time)
const cutoffTime = new Date('2026-04-17T09:00:00+05:00').getTime(); 

const results = [];

function checkHistory() {
    if (!fs.existsSync(historyDir)) {
        console.log("No directory ", historyDir);
        return;
    }
    const folders = fs.readdirSync(historyDir);

    folders.forEach(folder => {
        const folderPath = path.join(historyDir, folder);
        const entriesPath = path.join(folderPath, 'entries.json');
        
        if (fs.existsSync(entriesPath)) {
            try {
                const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                // Include EVERYTHING in src folder, not just components
                if (data.resource && data.resource.toLowerCase().includes('digikhyber/src/')) {
                    let bestEntry = null;
                    let bestTime = 0;
                    
                    data.entries.forEach(entry => {
                        // Find the absolute latest state BEFORE 9:00 AM today
                        if (entry.timestamp <= cutoffTime && entry.timestamp > bestTime) {
                            bestTime = entry.timestamp;
                            bestEntry = entry;
                        }
                    });
                    
                    if (bestEntry) {
                        results.push({
                            file: decodeURIComponent(data.resource.replace('file:///', '')),
                            timestamp: new Date(bestEntry.timestamp).toISOString(),
                            localTime: new Date(bestEntry.timestamp).toString(),
                            backupFile: path.join(folderPath, bestEntry.id)
                        });
                    }
                }
            } catch (e) { }
        }
    });

    results.forEach(res => {
        if (fs.existsSync(res.backupFile)) {
             try {
                 const content = fs.readFileSync(res.backupFile, 'utf8');
                 // Ensure valid path mapping
                 let cleanPath = res.file;
                 // Fix case sensitivity issues from URI decode
                 cleanPath = cleanPath.replace(/^d:\/desktop/i, 'd:/Desktop');
                 fs.writeFileSync(cleanPath, content);
             } catch(err) { console.error("Error writing " + res.file, err)}
        }
    });
    
    fs.writeFileSync('recovery_log_v4.json', JSON.stringify(results, null, 2));
    console.log(`Restored ${results.length} total files across src/ from Antigravity history. See recovery_log_v4.json`);
}

checkHistory();
