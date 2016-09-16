import React from 'react'
import { mount } from 'enzyme'
// import sinon from 'sinon'
import { expect } from 'chai'
import { describe, it } from 'mocha'

// Add DOM environment
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
