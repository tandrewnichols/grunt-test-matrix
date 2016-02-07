sinon = require('sinon')

describe 'testMatrix', ->
  Given -> @n =
    run: sinon.stub()
  Given -> @yaml = sinon.stub()
  Given -> @subject = require('proxyquire').noCallThru() '../tasks/testMatrix',
    'n-run': @n
    'travis-yaml': @yaml

  Given -> @grunt =
    registerMultiTask: sinon.stub()
  Given -> @done = sinon.stub()
  Given -> @context =
    async: => @done
    options: (o) -> o

  context 'task is a string', ->
    Given -> @yaml.callsArgWith 0, null,
      node_js: ['0.10', '0.12', 'iojs-v1', 'iojs-v2', '4']
    Given -> @context.data =
      task: 'foo bar'
    When -> @subject @grunt
    And -> @grunt.registerMultiTask.getCall(0).args[2].apply @context
    Then -> @n.run.calledWith('grunt foo bar', ['0.10', '0.12', '1', '2', '4'],
      quiet: false
      install: 'latest'
      global: true
    , @done).should.be.true()

  context 'task is an array', ->
    Given -> @yaml.callsArgWith 0, null,
      node_js: ['0.10', '0.12', 'iojs-v1', 'iojs-v2', '4']
    Given -> @context.data =
      task: ['foo', 'bar']
    When -> @subject @grunt
    And -> @grunt.registerMultiTask.getCall(0).args[2].apply @context
    Then -> @n.run.calledWith(['grunt', 'foo', 'bar'], ['0.10', '0.12', '1', '2', '4'],
      quiet: false
      install: 'latest'
      global: true
    , @done).should.be.true()

  context 'error loading travis yaml', ->
    Given -> @yaml.callsArgWith 0, 'error'
    Given -> @context.data =
      task: ['foo', 'bar']
    When -> @subject @grunt
    And -> @grunt.registerMultiTask.getCall(0).args[2].apply @context
    Then ->
      @done.calledWith('error').should.be.true()
      @n.run.called.should.be.false()
