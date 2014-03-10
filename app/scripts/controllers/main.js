'use strict';

angular.module('d3App')
    .controller('MainCtrl', function($scope) {

        $scope.results = [{
            answer: "A",
            value: 100,
            color: '#FFDC00',
            size: 0
        }, {
            answer: "B",
            value: 100,
            color: '#CFDC29',
            size: 0
        }, {
            answer: "C",
            value: 100,
            color: '#7AC142',
            size: 0
        }, {
            answer: "D",
            value: 100,
            color: '#00A84F',
            size: 0
        }, {
            answer: "E",
            value: 100,
            color: '#00765E',
            size: 0
        }];

        var getTotal = function() {
            var total = 0;

            for (var i = 0, j = $scope.results.length; i < j; i += 1) {
                var result = $scope.results[i];
                total += result.value;
            }

            return total;
        };

        var fullRadius = 200;

        var getPercentage = function(value, total) {
            return (fullRadius / total) * value;
        };

        var container = d3.select("#results"),
            circles = container.selectAll('circle')
                .data($scope.results)
                .enter()
                .append('circle');

        container
            .append('circle')
            .style('fill', 'rgba(0, 0, 0, 0)')
            .style('stroke', '#000000')
            .attr('r', fullRadius)
            .attr('cx', function(d, i) {
                var width = this.getBoundingClientRect().width;
                return (container.attr('width') / 2);
            })
            .attr('cy', function(d, i) {
                var height = this.getBoundingClientRect().height;
                return (container.attr('height') / 2);
            })


        $scope.updateCircles = function() {

            var prevValue = 0;

            circles
                .attr("r", function(d, i) {
                    // console.log((fullRadius / getTotal()) * d.value);
                    // return (fullRadius / getTotal()) * d.value;
                    var r = getPercentage(d.value, getTotal());

                    if (r < fullRadius) {
                        var tmpr = r + prevValue;
                        prevValue += r;
                        r = tmpr;

                    }

                    d.size = r;

                    console.log(r, prevValue);

                    return r;
                })
                .style("fill", function(d, i) {
                    return d.color;
                })
                .attr("cx", function(d, i) {
                    var width = this.getBoundingClientRect().width;
                    return (container.attr('width') / 2);
                })
                .attr("cy", function(d, i) {
                    var height = this.getBoundingClientRect().height;
                    return (container.attr('height') / 2);
                })
                .sort(function(a, b) {
                    return a.size < b.size;
                });

        };

        $scope.updateCircles();

    });