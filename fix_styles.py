
import os

file_path = r'c:\Users\gaga2\OneDrive\Desktop\money-money-01-02--main - 複製\styles.css'

# 1. Read the file (treating as binary to avoid encoding errors initially, or utf-8 with ignore)
try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
except Exception as e:
    print(f"Error reading file: {e}")
    exit(1)

# 2. Truncate at line 37337
# The last valid line is '}' at 37337 for the festive theme block
# We want to keep lines 0 to 37336 (since 0-indexed)
if len(lines) > 37337:
    print(f"Truncating file from {len(lines)} lines to 37337 lines.")
    lines = lines[:37337]
else:
    print("File is already shorter than 37337 lines.")

# 3. Fix the invisible character at line ~31563
# We look for the specific block and replace it with clean text
target_block_start = ':root[data-theme="starry"] select:focus {'
found_fix = False

for i in range(len(lines)):
    if target_block_start in lines[i]:
        # Check if the next few lines match the problematic block
        # The specific line with hidden chars is likely index i+3
        if i+4 < len(lines) and 'transform: translateY(-1px) !important;' in lines[i+4]:
            print(f"Found starry theme block at line {i+1}")
            # Replace the box-shadow line (i+3) with clean text
            clean_line = '    box-shadow: 0 0 20px rgba(236, 72, 153, 0.3) !important, inset 0 0 10px rgba(107, 70, 193, 0.1) !important;\n'
            lines[i+3] = clean_line
            found_fix = True
            break

if not found_fix:
    print("Warning: Could not find the starry theme block to fix invisible characters.")

# 4. Write back to file
try:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully wrote fixed content to styles.css")
except Exception as e:
    print(f"Error writing file: {e}")
    exit(1)
