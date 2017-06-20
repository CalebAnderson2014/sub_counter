'use strict';
const { dummyData, dummyChannel } = require('./test_data.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const UserModel = require('../db/models/user.js');
const ChannelModel = require('../db/models/channel.js');
const ChannelController = require('../db/controllers/channel.js');
mongoose.connect('mongodb://localhost/subcount_test'); 

describe('Integration tests', function() {
  before(function(done) {    
    ChannelModel.create(dummyData, function(err, rows) {
      if (err) {
        console.log(err);
        throw err;
      }
      done();   
    });  
  });

  describe('Channel model', function() {
    it('should be invalid if required fields are empty', function(done) {
      const channel = new ChannelModel();

      channel.validate(function(err) {
        expect(err.errors).to.exist;
        done();
      });
    });

    it('does not add duplicate channel', function(done) {
      const goodChannel = new ChannelModel(dummyChannel);

      goodChannel.save(function(err) {
        expect(err.message).to.include('duplicate key');
        ChannelModel.find(function(err, channels) {
          expect(channels.length).to.equal(dummyData.length);
        });
        done();
      });
    });
  });
  describe('Channel controller', function() {
    describe('addSub', function() {
      it('should be a function', function(done) {
        expect(ChannelController.addSub).to.be.a('function');
        done();
      });
      it('should add a user to a channels subscribers', function(done) {
        ChannelController.addSub('#imaqtpie', 'testerson', 2)
          .then(() => {
            ChannelModel.findOne({ name: '#imaqtpie' })
              .populate('subscribers')
              .exec((err, asd) => {
                expect(asd.subscribers[0].name).to.equal('testerson');
                done();
              });
          });
      });
      it('should add channel to the user', function(done) {
        ChannelController.addSub('#drdisrespectlive', 'testerson')
          .then(() => {
            UserModel.findOne({name: 'testerson'})
              .populate('channels')
              .exec((err, user) => {
                expect(user.channels[1].name).to.equal('#drdisrespectlive');
                done();
              });
          });
      });
    });
    describe('getChannelSubs', function() {
      it('should be a function', function(done) {
        expect(ChannelController.getChannelSubs).to.be.a('function');
        done();
      });
      it('should return an array of subs', function(done) {
        ChannelController.getChannelSubs('#imaqtpie')
          .then((subs) => {
            expect(subs).to.be.an('array');
            expect(subs[0]).to.be.an('object');
            done();
          });
      });
    });
    describe('findSharedSubs', function() {
      it('should be a function', function(done) {
        expect(ChannelController.findSharedSubs).to.be.a('function');
        done();
      });
    });
    describe('getNewSubs', function() {
      it('should be a function', function(done) {
        expect(ChannelController.getNewSubs).to.be.a('function');
        done();
      });
      it('should, given a channel name, return an array of user objects that just subbed', function(done) {
        ChannelController.addSub('#drdisrespectlive', 'newHere')
          .then(() => {
            return ChannelController.getNewSubs('#drdisrespectlive');
          })
          .then((subs) => {
            expect(subs).to.be.an('array');
            var subNames = subs.map(sub => sub.name).filter(name => name);
            expect(subNames).to.include('newHere');
            expect(subs.every(function(sub) { return sub.months === 0; })).to.be.true;
            done();
          });
      });
    });
  });
  after(function(done) {    
    ChannelModel.remove({}, function() {
      UserModel.remove({}, function() {
        done();    
      });
    });  
  }); 
});
