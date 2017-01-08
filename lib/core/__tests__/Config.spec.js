'use strict';var _Config=require('../Config');jest.mock('fs');beforeEach(function(){var fs=require('fs');fs.lstatSync=function(){var err=new Error;err.code='ENOENT';throw err}});describe('Config#init',function(){it('should throw when pass non-object',function(){expect(function(){return _Config.Config.init(null)}).toThrow();expect(function(){return _Config.Config.init([])}).toThrow()});it('should throw when host is not provided',function(){expect(function(){return _Config.Config.init({})}).toThrow();expect(function(){return _Config.Config.init({host:''})}).toThrow()});it('should throw when port is not natural number',function(){expect(function(){return _Config.Config.init({host:'localhost',port:-1})}).toThrow()});it('should throw when server_host(if provided) is empty',function(){expect(function(){return _Config.Config.init({host:'localhost',port:1080,server_host:''})}).toThrow()});it('should throw when server_port(if provided) is not natural number',function(){expect(function(){return _Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1.1})}).toThrow()});it('should throw when password is not string',function(){expect(function(){_Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1080,password:null})}).toThrow()});it('should throw when cipher is not string',function(){expect(function(){_Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1080,password:'123',cipher:null})}).toThrow()});it('should throw when cipher is not available',function(){expect(function(){_Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1080,password:'123',cipher:'abc'})}).toThrow()});it('should throw when use_iv is not boolean',function(){expect(function(){_Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1080,password:'123',cipher:'aes-256-cfb',use_iv:null})}).toThrow()});it('should throw when password is empty or DEFAULT_KEY',function(){expect(function(){_Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1080,cipher:'aes-256-cfb',use_iv:true,password:''})}).toThrow();expect(function(){_Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1080,cipher:'aes-256-cfb',use_iv:true,password:_Config.DEFAULT_KEY})}).toThrow()});it('isServer should be false',function(){_Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1080,password:'123',cipher:'aes-256-cfb',use_iv:false});expect(_Config.Config.isServer).toBe(false)});it('should be non-encryption mode',function(){_Config.Config.init({host:'localhost',port:1080,server_host:'localhost',server_port:1080,password:'123',cipher:'',use_iv:true});expect(_Config.Config.cipher).toBe('');expect(_Config.Config.key).toBe('');expect(_Config.Config.use_iv).toBe(false)})});describe('Config#getKey',function(){it('should return a correct key',function(){expect(_Config.Config.getKey(_Config.DEFAULT_CIPHER,'password')).toBe('b45a44fcde0670bf6c56e5a1e0bf2c46')})});describe('Config#obtainCipher',function(){it('should fallback to DEFAULT_CIPHER',function(){expect(_Config.Config.obtainCipher('abc')).toBe(_Config.DEFAULT_CIPHER)})});describe('Config#setUpLogger',function(){it('should return DEFAULT_LOG_LEVEL',function(){expect(_Config.Config.setUpLogger()).toBe(_Config.DEFAULT_LOG_LEVEL)})});