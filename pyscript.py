import json

# Load the data from the JSON file
with open('tools.json', 'r') as f:
    data = json.load(f)

# Find the 'Nmap' tool and its 'Flags' section
nmap_data = next(tool for tool in data['tools'] if tool['name'] == 'Nmap')
flags_section = next(section for section in nmap_data['sections'] if section['title'] == 'Flags')

# Remove duplicate entries
seen = set()
flags_section['content'] = [x for x in flags_section['content'] if str(x) not in seen and not seen.add(str(x))]

# Write the result back to the JSON file
with open('tools.json', 'w') as f:
    json.dump(data, f, indent=4)