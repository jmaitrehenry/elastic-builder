'use strict';

const { inspect } = require('util');

const Query = require('./query');
const { checkType } = require('./util');
const { SCORE_MODE_SET } = require('./consts');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-rescore.html';

/**
 * A `rescore` request can help to improve precision by reordering just
 * the top (eg 100 - 500) documents returned by the `query` and `post_filter`
 * phases, using a secondary (usually more costly) algorithm, instead of
 * applying the costly algorithm to all documents in the index.
 *
 * The rescore phase is not executed when sort is used.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-rescore.html)
 *
 */
class Rescore {
    /**
     * Creates an instance of `Rescore`
     *
     * @param {number} windowSize
     * @param {Query} rescoreQuery
     */
    constructor(windowSize, rescoreQuery) {
        this._body = {};
        this._queryOpts = this._body.query = {};

        windowSize && this.windowSize(windowSize);
        rescoreQuery && this.rescoreQuery(rescoreQuery);
    }

    /**
     * The number of docs which will be examined on each shard can be controlled
     * by the window_size parameter, which defaults to `from` and `size`.
     *
     * @param {number} windowSize
     * @returns {Rescore} returns `this` so that calls can be chained.
     */
    windowSize(windowSize) {
        this._body.window_size = windowSize;
        return this;
    }

    /**
     * The query to execute on the Top-K results by the `query` and `post_filter` phases.
     *
     * @param {Query} rescoreQuery
     * @returns {Rescore} returns `this` so that calls can be chained.
     * @throws {TypeError} If `rescoreQuery` is not an instance of `Query`
     */
    rescoreQuery(rescoreQuery) {
        checkType(rescoreQuery, Query);

        this._queryOpts.rescore_query = rescoreQuery;
        return this;
    }

    /**
     * Control the relative importance of the original query.
     *
     * @param {number} weight Defaults to 1
     * @returns {Rescore} returns `this` so that calls can be chained.
     */
    queryWeight(weight) {
        this._queryOpts.query_weight = weight;
        return this;
    }

    /**
     * Control the relative importance of the rescore query.
     *
     * @param {number} weight Defaults to 1
     * @returns {Rescore} returns `this` so that calls can be chained.
     */
    rescoreQueryWeight(weight) {
        this._queryOpts.rescore_query_weight = weight;
        return this;
    }

    /**
     * Controls the way the scores are combined.
     *
     * @param {string} mode Can be one of `total`, `multiply`, `min`, `max`, `avg`.
     * Defaults to `total`.
     * @returns {Rescore} returns `this` so that calls can be chained.
     */
    scoreMode(mode) {
        if (!SCORE_MODE_SET.has(mode)) {
            console.log(`See ${ES_REF_URL}`);
            throw new Error(
                `The 'score_mode' parameter should belong to ${inspect(SCORE_MODE_SET)}`
            );
        }

        this._queryOpts.score_mode = mode;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation
     *
     * @override
     * @returns {Object}
     */
    toJSON() {
        return this._body;
    }
}

module.exports = Rescore;
