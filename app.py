from flask import Flask, request, jsonify
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Generate RSA keys (for demonstration purposes)
key = RSA.generate(2048)
private_key = key.export_key()
public_key = key.publickey().export_key()

# Encrypt sensitive fields
def encrypt_data(data):
    public_key_obj = RSA.import_key(public_key)
    cipher = PKCS1_OAEP.new(public_key_obj)
    encrypted_data = cipher.encrypt(data.encode())
    return binascii.hexlify(encrypted_data).decode()

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json.get('data', '')
    encrypted_data = encrypt_data(data)
    return jsonify({"encrypted_data": encrypted_data})

if __name__ == '__main__':
    app.run(debug=True)
