//Requesting dependencies
const passport = require ('passport');
const localStrategy = require('passport-local').Strategy;
const UserId = require ('./Id/userId');
const JwtStrategy = require ('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;


passport.use (
    new JwtStrategy (
        {
            secretOrKey : process.env.Jwt_SECRET || 'secret',
            //requesting token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },

        async (token, done) => {
            try {
                return done (null, token.user);
            }
            catch (error) {
                done (error);
            }
        }
    )
)

//creating an account 
passport.use (
    'signup',
    new localStrategy (
        {
            usernameField : 'username',
            passwordField : 'password'
        },
        async (
            username, password, done
        )=> {
            try {
                const user = await UserId.create ({username, password});
                return done (null, user, {
                    message : 'User Successfully Created'
                });
            } catch(error) {
                console.error( error);
                done (error);
            }
        }
    )
);

// signing into your account
passport.use(
    'signIn',
    new localStrategy (
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        async (req, username, password, done) => {
            try {
                const user = await UserId.findOne ({username});
                if (!user) {
                    return done (null, false, {message: 'user does not exist'});
                }
                const validate = await user.ValidPassword(password);
                if (!validate) {
                    return done (null, false, {message: 'password not correct'});
                }
                     return done (null, user, {message : 'SignedUp Successfully'});
            }
            catch (error) {
                return done (error);
            }
        }
    )
);


