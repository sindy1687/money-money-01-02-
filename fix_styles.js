
const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'gaga2', 'OneDrive', 'Desktop', 'money-money-01-02--main - 複製', 'styles.css');

try {
    // 1. Read file
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split(/\r?\n/);
    
    console.log(`Original line count: ${lines.length}`);

    // 2. Truncate at line 37337 (keep 0 to 37336)
    if (lines.length > 37337) {
        console.log('Truncating file to 37337 lines.');
        lines = lines.slice(0, 37337);
    }

    // 3. Fix invisible character at line ~31563
    let foundFix = false;
    const targetBlockStart = ':root[data-theme="starry"] select:focus {';
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(targetBlockStart)) {
            // Check if context matches
            if (i + 4 < lines.length && lines[i + 4].includes('transform: translateY(-1px) !important;')) {
                console.log(`Found starry theme block at line ${i + 1}`);
                // Replace the box-shadow line (i+3) with clean text
                lines[i + 3] = '    box-shadow: 0 0 20px rgba(236, 72, 153, 0.3) !important, inset 0 0 10px rgba(107, 70, 193, 0.1) !important;';
                foundFix = true;
                break;
            }
        }
    }

    if (!foundFix) {
        console.warn('Warning: Could not find the starry theme block to fix invisible characters.');
    }

    // 4. Write back
    const newContent = lines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully wrote fixed content to styles.css');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
