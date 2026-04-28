const fs = require('fs');
const path = require('path');

const historyDir = path.join(process.env.APPDATA, 'Code', 'User', 'History'); // Fallback if Code is used
const antigravityDir = path.join(process.env.APPDATA, 'Antigravity', 'User', 'History');
const targetDir = fs.existsSync(antigravityDir) ? antigravityDir : (fs.existsSync(historyDir) ? historyDir : null);

// Target time: Before 9:30 AM Today (April 20, 2026 local time)
const cutoffTime = new Date('2026-04-20T09:30:00+05:00').getTime(); 

const results = [];

function checkHistory() {
    if (!targetDir || !fs.existsSync(targetDir)) {
        console.log("No directory ", targetDir);
        return;
    }
    console.log("Using history directory: ", targetDir);
    const folders = fs.readdirSync(targetDir);

    folders.forEach(folder => {
        const folderPath = path.join(targetDir, folder);
        const entriesPath = path.join(folderPath, 'entries.json');
        
        if (fs.existsSync(entriesPath)) {
            try {
                const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                if (data.resource && data.resource.toLowerCase().includes('hunarmand-punjab/src/')) {
                    let bestEntry = null;
                    let bestTime = 0;
                    
                    data.entries.forEach(entry => {
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
                 let cleanPath = res.file;
                 cleanPath = cleanPath.replace(/^d:\/desktop/i, 'd:/Desktop');
                 fs.writeFileSync(cleanPath, content);
             } catch(err) { console.error("Error writing " + res.file, err)}
        }
    });
    
    fs.writeFileSync('recovery_today.json', JSON.stringify(results, null, 2));
    console.log(`Restored ${results.length} total files across src/ to state before 9:30 AM today. See recovery_today.json`);
}

checkHistory();
