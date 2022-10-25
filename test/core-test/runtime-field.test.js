import test from 'ava';
import RuntimeField from '../../src/core/runtime-field';

test('constructor set arguments', t => {
    const valueA = new RuntimeField(
        'keyword',
        "emit(doc['name'].value)"
    ).toJSON();
    const valueB = new RuntimeField(
        'keyword',
        "emit(doc['name'].value)"
    ).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        type: 'keyword',
        script: {
            source: "emit(doc['name'].value)"
        }
    };
    t.deepEqual(valueA, expected);

    let err = t.throws(() => new RuntimeField().toJSON(), Error);
    t.is(err.message, '`type` should be set');

    err = t.throws(() => new RuntimeField('keyword').toJSON(), Error);
    t.is(err.message, '`script` should be set');
});

test('type validate and set argument', t => {
    const fieldA = new RuntimeField('keyword', "emit(doc['name'].value)");
    fieldA.type('boolean');
    const expected = {
        type: 'boolean',
        script: {
            source: "emit(doc['name'].value)"
        }
    };
    t.deepEqual(fieldA.toJSON(), expected);

    const err = t.throws(() => fieldA.type('invalid'), Error);
    t.is(
        err.message,
        '`type` must be one of boolean, composite, date, double, geo_point, ip, keyword, long, lookup'
    );
});

test('name set _name', t => {
    const fieldA = new RuntimeField();
    fieldA.name('field-name');
    t.deepEqual(fieldA._name, 'field-name');
});
