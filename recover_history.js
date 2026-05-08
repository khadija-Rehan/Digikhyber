const fs = require('fs');
const path = require('path');

const historyDir = path.join(process.env.APPDATA, 'Code', 'User', 'History');
// Local time is UTC+5. Rollback happened around 19:28 local time.
// We want the latest file state from before 19:00 local time (14:00 UTC) today.
const cutoffTime = new Date('2026-04-17T19:00:00+05:00').getTime(); 

const results = [];

function checkHistory() {
    if (!fs.existsSync(historyDir)) {
        return;
    }
    const folders = fs.readdirSync(historyDir);

    folders.forEach(folder => {
        const folderPath = path.join(historyDir, folder);
        const entriesPath = path.join(folderPath, 'entries.json');
        
        if (fs.existsSync(entriesPath)) {
            try {
                const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                if (data.resource && data.resource.toLowerCase().includes('digikhyber/src/components/')) {
                    let bestEntry = null;
                    let bestTime = 0;
                    
                    data.entries.forEach(entry => {
                        // Get the state just before the destruction window
                        if (entry.timestamp < cutoffTime && entry.timestamp > bestTime) {
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
    
    fs.writeFileSync('recovery_log_v2.json', JSON.stringify(results, null, 2));
    console.log(`Found ${results.length} component files. See recovery_log_v2.json`);
}

checkHistory();
