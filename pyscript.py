import json

# Load the data from the JSON file
with open('ports.json', 'r') as f:
    data = json.load(f)

# Extract the list of ports
ports = list(data.values())[0]

# Find the ports that have "" as service
empty_service_ports = [port for port in ports if port['service'] == ""]

# Print the ports that have "" as service
for port in empty_service_ports:
    print(port['port'])