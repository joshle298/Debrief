import json
import re

def load_har_file(file_path):
    with open(file_path, 'r') as f:
        har_data = json.load(f)
    return har_data

def save_json_file(data, output_file_path):
    with open(output_file_path, 'w') as f:
        json.dump(data, f, indent=4)

def filter_entries(entries):
    filtered_entries = []
    for entry in entries:
        filtered_entry = {}
        filtered_entry['priority'] = entry.get('_priority', None)
        
        content_text = entry['response'].get('content', {}).get('text', None)
        if content_text:
            neighborhood_raw_pattern = r'(?:\\)?\"neighborhood(?:\\)?\":(?:\\)?\"(.*?)(?:\\)?\",(?:\\)?\"raw(?:\\)?\":(?:\\)?\"(.*?)(?:\\)?\"'
            
            neighborhood_raw_matches = re.findall(neighborhood_raw_pattern, content_text)
            
            if neighborhood_raw_matches:
                filtered_entry['title'] = neighborhood_raw_matches[0][1]
                filtered_entry['startTime'] = entry.get('startedDateTime', None)
                filtered_entries.append(filtered_entry)

    return filtered_entries

if __name__ == "__main__":
    input_file_path = 'scrapers/citizen/citizen_data2.har'
    output_file_path = 'citizen_data.json'
    
    har_data = load_har_file(input_file_path)
    
    entries = har_data['log']['entries']
    filtered_entries = filter_entries(entries)

    output_data = {
        "title": "Citizen",
        "items": filtered_entries
    }
    
    save_json_file(output_data, output_file_path)
    print(f"Filtered JSON data saved to {output_file_path}")
