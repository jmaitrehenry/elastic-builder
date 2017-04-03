'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-valuecount-aggregation.html';

/**
 * A single-value metrics aggregation that counts the number of values that
 * are extracted from the aggregated documents. These values can be extracted
 * either from specific fields in the documents, or be generated by a provided
 * script. Typically, this aggregator will be used in conjunction with other
 * single-value aggregations.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-valuecount-aggregation.html)
 *
 * Aggregation that counts the number of values that are extracted from the
 * aggregated documents.
 *
 * @extends MetricsAggregationBase
 */
class ValueCountAggregation extends MetricsAggregationBase {

    /**
     * Creates an instance of `ValueCountAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    constructor(name, field) {
        super(name, 'value_count', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ValueCountAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in ValueCountAggregation');
    }
}

module.exports = ValueCountAggregation;
