/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

function logUser(user, label) {
  console.log("\n", label);
  console.log("- username: " + user.email);
  console.log("- password: " + user.password);
}

function logClient(client, label) {
  console.log("\n", label);
  console.log("- client_id: " + client.clientId);
  console.log("- client_secret: " + client.clientSecret);
  console.log("- redirectURI: " + client.redirectURI);
}

function createUser(theUser) {
  // Create a user
  User.findOne({email: theUser.email}, function(err, user) {
    if(!user){
      User.create(theUser).exec(function(err,user) {
        logUser(theUser, "Default user created");
      });
    } else {
      logUser(theUser, "Default user already exists");
    }
  });
}

function createClient(theClient) {
  // Create a client
  Client.findOne({name: theClient.name}, function(err, client) {
    if(err){
      console.log(err.message);
    } else {
      if (!client) {
        Client.create(theClient).exec(function(err, client) {
          if (err) {
            console.log(err.message);
          } else {
            logClient(client, "The " + theClient.name + " created");
          }
        });
      } else {
        logClient(client, "The " + theClient.name + " already exists");
      }
    }
  }); 
}

function createPost(thePost) {
  Post.findOne({title: thePost.title}, function(err, post) {
    if (err) {
      console.log(err.message);
    } else {
      if(!post) {
        Post.create(thePost).exec(function(err, createdPost) {
          if (err) {
            console.log(err.message);
          } else {
            console.log("The post " + thePost.title + " created successfully.");
          }
        });
      } else {
        console.log("The post " + thePost.title + " created successfully.");
      }
    }
  });
}

module.exports.bootstrap = function (cb) {

  createUser({
    email: 'adminz@gmail.com',
    password: 'password'
  });
  
  createClient({
    name : 'trustedTestClient',
    trusted: true,
    redirectURI: 'http://localhost:1338'
  });
  
  createClient({
    name : 'untrustedTestClient',
    trusted: false,
    redirectURI: 'http://localhost:1339'
  });
  
  for (var i=1; i<=100; i++) {
    createPost({
      title: 'test-title-' + i,
      content: 'test-content-' + i
    });
  }
  
  cb();
};
