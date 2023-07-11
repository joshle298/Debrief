from flask_cors import CORS
from flask import Flask, request, jsonify
from extract_posts import get_summary

# create a flask app
app = Flask(__name__)
CORS(app)

# create a route for the summary endpoint
@app.route('/summary', methods=['POST'])
def generate_summary():
    try:
        print("Request received")
        persona = request.json.get('persona')
        summary = get_summary(persona)
        print(f"Generated summary: {summary}")
        return jsonify({"status": "success", "summary": summary})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)})

# run the app depending on IP address
if __name__ == "__main__":
    app.run(host="10.101.1.132", port=5000)
