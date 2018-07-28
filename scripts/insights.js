
// years in which there was an insight (if year was repeated, that means multiple insights)
var years = [200,200,300,1250,1644,1654,1657,1669,1669,1669,1671,1671,1754,1756,1763,1768,1777,1805,1820,1821,1825,1838,1838,1842,1847,1857,1859,1859,1860,1864,1876,1885,1892,1895,1898,1901,1901,1901,1906,1907,1911,1917,1917,1918,1921,1926,1927,1927,1928,1931,1933,1933,1934,1935,1936,1936,1937,1939,1943,1944,1945,1945,1945,1946,1946,1947,1947,1948,1948,1948,1949,1949,1950,1950,1950,1950,1951,1951,1951,1952,1952,1952,1953,1954,1955,1956,1957,1957,1957,1957,1957,1957,1958,1959,1960,1960,1960,1960,1960,1961,1962,1963,1963,1963,1963,1964,1964,1965,1965,1965,1965,1966,1968,1968,1969,1969,1969,1969,1970,1970,1971,1971,1971,1971,1972,1974,1974,1977,1979,1981,1982,1982,1982,1983,1983,1984,1984,1984,1984,1985,1985,1985,1986,1986,1987,1987,1987,1987,1987,1989,1989,1989,1990,1992,1992,1994,1994,1995,1995,1996,1997,1997,1998,1998,1998,1999,2000,2000,2000,2001,2002,2002,2003,2005,2005,2008,2008,2008,2009,2009,2010,2010,2011,2013,2013,2014,2014,2015,2015,2015,2016,2016,2016,2016,2017,2017];

years.sort();

var minYear = 1850; // ignore insights before this year

years = years.filter(function(y) { return y >= 1850; });


function numInsightsBy(year) {
  return years.filter(function(y) { return y <= year; }).length;
}

var rateStart = 1945;
var rateEnd = 2017;
var rateEst = (numInsightsBy(rateEnd)-numInsightsBy(rateStart))/(rateEnd-rateStart);

function impliedTimeline(portionDone) {
  var totalNum = numInsightsBy(rateEnd) / portionDone;
  var numLeft = totalNum - numInsightsBy(rateEnd);
  var yearsLeft = numLeft / rateEst;
  return rateEnd + yearsLeft;
}

var progressPoints; 

function clearProgressPoints() {
  progressPoints = [[0.0, 0.0], [1.0, 1.0]];
}

clearProgressPoints();

function addProgressPoint(x, y) {
  var pt = [x, y];
  progressPoints.push(pt);
  progressPoints.sort(function(a, b) { return a[0] - b[0]; });
  var ptIndex = progressPoints.indexOf(pt);
  // move previous points that are too high down
  for (var i = 0; i < progressPoints.length; ++i) {
    if (progressPoints[i][0] <= x && progressPoints[i][1] > y) {
      progressPoints[i][1] = y;
    }
  }
  // move further points that are too low up
  for (var i = 0; i < progressPoints.length; ++i) {
    if (progressPoints[i][0] >= x && progressPoints[i][1] < y) {
      progressPoints[i][1] = y;
    }
  }
}

function genProgressDistrFromPrior(priorSampler) {
  var nInsightsSamps = [];
  for (var i = 0; i < 10000; ++i) {
    var nInsights;
    do {
      nInsights = priorSampler();
    } while (nInsights <= numInsightsBy(rateEnd));
    nInsightsSamps.push(nInsights);
  }
  function cdf(proportion) {
    var nInsightsReq = numInsightsBy(rateEnd) / proportion;
    return nInsightsSamps.filter(function(n) { return n >= nInsightsReq; }).length / nInsightsSamps.length;
  }
  clearProgressPoints();
  for (var x = 0.005; x < 1.0; x += 0.005) {
    addProgressPoint(x, cdf(x));
  }
}

function samplePareto(min, q) {
  // assume exponential distribution over number of doublings required
  // exponential cdf: p = 1 - e^(-lambda x)
  // q = 1 - e^(-lambda * 1)
  // lambda = -ln(1 - q)
  var lambda = -Math.log(1 - q);
  var nDoublings = jStat.exponential.sample(lambda);
  nDoublings = Math.min(nDoublings, 800.0); // prevent overflow
  return min * Math.pow(2, nDoublings);
}

function drawProgress() {
  var canv = document.getElementById('progress_distr');
  var ctx = canv.getContext('2d');
  ctx.fillStyle = 'rgb(254, 254, 254)';
  ctx.fillRect(0, 0, canv.width, canv.height)
  ctx.strokeStyle = 'rgb(219, 218, 215)';
  for (var i = 1; i <= 9; ++i) {
    ctx.lineWidth = i == 5 ? 3 : 1;
    ctx.beginPath();
    ctx.moveTo(i / 10 * canv.width, 0);
    ctx.lineTo(i / 10 * canv.width, canv.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i / 10 * canv.height);
    ctx.lineTo(canv.width, i / 10 * canv.height);
    ctx.stroke()
  }
  ctx.strokeStyle = 'rgb(234, 211, 145)';
  ctx.lineWidth = 5;
  for (var i = 0; i < progressPoints.length - 1; ++i) {
    var pt1 = progressPoints[i];
    var pt2 = progressPoints[i+1];
    ctx.beginPath();
    ctx.moveTo(pt1[0] * canv.width, (1.0 - pt1[1]) * canv.height);
    ctx.lineTo(pt2[0] * canv.width, (1.0 - pt2[1]) * canv.height);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgb(234, 211, 145)';
  for (var i = 1; i < progressPoints.length - 1; ++i) {
    var pt = progressPoints[i];
    ctx.beginPath();
    ctx.arc(pt[0] * canv.width, (1.0 - pt[1]) * canv.height, 6, 0, 2 * Math.PI);
    ctx.fill();
  }
}


function estProbNoMoreThanPortionDone(prop) {
  if (prop < 0) prop = 0;
  if (prop > 1) prop = 1;
  for (var i = 0; i < progressPoints.length - 1; ++i) {
    var pt1 = progressPoints[i];
    var pt2 = progressPoints[i+1];
    if (prop >= pt1[0] && prop <= pt2[0]) {
      return pt1[1] + (prop - pt1[0]) / (pt2[0] - pt1[0]) * (pt2[1] - pt1[1]);
    }
  }
  console.log('error!');
}

function plotTimeline() {
  var lastYear = $('#last_year').val();
  function toYear(portionDone) {
    if (portionDone < 0.0001) portionDone = 0.0001;
    return impliedTimeline(portionDone);
  }
  var points = [];
  for (var portion = 0.01; portion <= 1.0; portion += 0.002) {
    var prob = estProbNoMoreThanPortionDone(portion);
    points.push([impliedTimeline(portion), 1 - prob]);
  }
  var opts = {
    xaxis: {min: rateEnd, max: lastYear},
    yaxis: {min: 0, max: 1, ticks: 10}
  };
  $.plot($('#timeline_placeholder'), [points], opts);
}

function plotInsights() {
  var actual = [];
  var est = [];
  var xs = [];
  var ys1 = [];
  var ys2 = [];
  for (var year = minYear; year <= rateEnd; ++year) {
    actual.push([year, numInsightsBy(year)]);
    est.push([year, rateEst * (year - rateEnd) + numInsightsBy(rateEnd)]);
  }

  var opts = {
    xaxis: {min: minYear, max: rateEnd},
    yaxis: {min: 0, max: numInsightsBy(rateEnd)},
    legend: {show: true, position: 'nw'}

  };
  $.plot($('#insights_placeholder'), [
      {label: 'Number of insights discovered up to this year', data: actual},
      {label: 'Linear approximation (from ' + rateStart + ' to ' + rateEnd + ')', data: est}], opts);
}

$(function() {
  drawProgress();
  plotTimeline();
  var progressDistr = $('#progress_distr');
  progressDistr.click(function(e) {
    var x = (e.pageX - progressDistr.offset().left) / progressDistr.width();
    var y = 1.0 - (e.pageY - progressDistr.offset().top) / progressDistr.height();
    addProgressPoint(x, y);
    drawProgress();
    plotTimeline();
  });
  $('#clear_button').click(function() {
    clearProgressPoints();
    drawProgress();
    plotTimeline();
  });
  $('#last_year').on('input', function() {
    plotTimeline();
  });
  $('#pareto_button').click(function() {
    var minInsights = $('#min_insights').val();
    var q = $('#pareto_q').val();
    genProgressDistrFromPrior(function() { return samplePareto(minInsights, q); });
    drawProgress();
    plotTimeline();
  });
  $('#uniform_pareto_button').click(function() {
    var minInsights = $('#min_insights').val();
    genProgressDistrFromPrior(function() { 
      return samplePareto(minInsights, jStat.uniform.sample(0, 1));
    });
    drawProgress();
    plotTimeline();
  });
  $('#beta_pareto_button').click(function() {
    var minInsights = $('#min_insights').val();
    var alpha = $('#alpha').val();
    var beta = $('#beta').val();
    genProgressDistrFromPrior(function() { 
      return samplePareto(minInsights, jStat.beta.sample(alpha, beta));
    });
    drawProgress();
    plotTimeline();
  });
  plotInsights();
});
