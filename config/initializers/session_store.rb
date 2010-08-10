# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_thingerling_session',
  :secret      => '26139ae21d01409215ea63ae96418429bd8915b41f6a9f7df7abc6461920170c24b635a0b34bf40ac0980a1b3ba6d6b1d6ee86a2754189146300073f5e762089'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
