import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const contributionsPath = path.resolve('src/data/contributions.json');
const contributions = JSON.parse(fs.readFileSync(contributionsPath, 'utf8'));

const validRoles = ["author", "contributor", "maintainer"];

assert(Array.isArray(contributions), 'Contributions should be an array');

contributions.forEach((project, index) => {
  const { name, url, description, languages, role, website } = project;

  assert.strictEqual(typeof name, 'string', `Project at index ${index} must have a name string`);
  assert.strictEqual(typeof url, 'string', `Project at index ${index} must have a url string`);
  assert.strictEqual(typeof description, 'string', `Project at index ${index} must have a description string`);
  assert(Array.isArray(languages), `Project at index ${index} must have a languages array`);
  languages.forEach((lang, langIndex) => {
    assert.strictEqual(typeof lang, 'string', `Language at index ${langIndex} in project "${name}" must be a string`);
  });

  assert.strictEqual(typeof role, 'string', `Project "${name}" must have a role string`);
  const roles = role.split('|');
  roles.forEach(r => {
    assert(validRoles.includes(r), `Invalid role "${r}" in project "${name}". Valid roles are: ${validRoles.join(', ')}`);
  });

  if (website !== undefined) {
    assert.strictEqual(typeof website, 'string', `Project "${name}" website must be a string`);
    if (website !== "") {
        try {
            new URL(website);
        } catch (e) {
            assert.fail(`Project "${name}" website "${website}" is not a valid URL`);
        }
    }
  }
});

console.log('✅ Contributions data validation passed!');
