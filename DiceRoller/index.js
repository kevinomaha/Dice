module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
   // Retrieve the sides and number of dice from the request query
    const s_sides = (req.query.sides || (req.body && req.body.sides));
    const s_numdice = (req.query.numdice || (req.body && req.body.numdice));
    var sides = parseInt(s_sides);
    var numdice = parseInt(s_numdice);

    // Set the initial value of the variables
    var total = 0;
    var body = {};

    // Check to see if the variables were provided
    if(( sides > 0) && ( numdice > 0)) {
        // For each dice, call the random function to retrieve the dice value
        for(counter=0; counter < numdice; ++counter) {
        var roll = between(1, sides + 1);
        body["Roll " + (counter+1)] =  roll;
        total = total + roll;
        }
        body.total =  total;
        context.res.setHeader('Content-Type', 'application/json');
        context.res.end(JSON.stringify(body));
    } else {
        // Correct parameters were not provided.
        body = "<h1>Invalid Parameters</h1>";
        body += "<h3>Paramater Format: sides=?&numdice=?</h3>";
        body += "<p>Example: ?sides=6&numdice=9</p>";
        context.res.setHeader('Content-Type', 'text/html');
        context.res.end(body);
    }


}

//Function to compute random number between two values
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
  