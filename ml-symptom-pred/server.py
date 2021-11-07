  
import model # Import the python file containing the ML model
from flask import Flask, request, render_template,jsonify # Import flask libraries

# Initialize the flask class and specify the templates directory
app = Flask(__name__,template_folder="templates")

# Default route set as 'home'
@app.route('/home')
def home():
    return render_template('home.html') # Render home.html

# Route 'classify' accepts GET request
@app.route('/classify',methods=['POST','GET'])
def classify_type():
    try:
        a = request.args.get('a') # Get parameters for sepal length
        b = request.args.get('b') # Get parameters for sepal width
        c = request.args.get('c') # Get parameters for petal length
        d = request.args.get('d') # Get parameters for petal width
        e = request.args.get('e')
        f = request.args.get('f')
        g = request.args.get('g')
        h = request.args.get('h')
        i = request.args.get('i')
        j = request.args.get('j')
        k = request.args.get('k')
        l = request.args.get('l')
        m = request.args.get('m')
        n = request.args.get('n')
        o = request.args.get('o')
        p = request.args.get('p')
        # Get the output from the classification model
        variety = model.classify(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)

        # Render the output in new HTML page
        return render_template('output.html', variety=variety)
    except:
        return 'Error'

# Run the Flask server
if(__name__=='__main__'):
    app.run(debug=True)