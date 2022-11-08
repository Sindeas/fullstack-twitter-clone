# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Joe = User.create :username => 'Joe', :email => 'joe@email.com', :password => 'Password'

Jack = User.create :username => 'Jack', :email => 'jack@email.com', :password => 'Password'

Jim = User.create :username => 'Jim', :email => 'jim@email.com', :password => 'Password'

Jerry = User.create :username => 'Jerry', :email => 'jerry@email.com', :password => 'Password'