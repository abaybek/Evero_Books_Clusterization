from flask import Flask, jsonify, render_template, url_for
import json



articles = {}

with open("doc2vec/output.json") as json_file:
    articles = json.load(json_file)


app = Flask(__name__)
app.config.update(SERVER_NAME='127.0.0.1:5000', debug=True)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/api/books/<term>')
def get_articles_by(term):
	# print(articles)
	return jsonify(articles)

# @app.route('/api/get_topics/')
# def get_topics():
# 	result = []
# 	for claster in articles:
# 		top = {}
# 		top['id'] = claster['cluster']
# 		top['topics'] = claster['topics']
# 		result.append(top)
# 	return jsonify(result)

with app.app_context():
    url_for('static', filename='style.css')


