// https://bankanet.nkbm.si/bnk/Nkbm?action=prglPlc&error=prglPlc
// serialize transactions to JSON

function fetch()
{
	$("#zhtForm tr").each(function(){
		var el  = $(this),
			tds = $("td", el),
			date;

		if (tds.length === 11)
		{
			date = tds.eq(7).text().split(".");
			data.push({
				num: tds.eq(0).text(),
				storitev : tds.eq(1).text(),
				vrsta: tds.eq(2).text(),
				opis: tds.eq(3).text(),
				znesek: parseFloat(tds.eq(4).text().replace(/,/g, "."), 10),
				valuta: tds.eq(5).text(),
				nalogodajalec: tds.eq(6).text(),
				datum: new Date(date[2] + "-" + date[1] + "-" + date[0]),
				prejemnik:  tds.eq(8).text(),
				dnevnik: parseInt(tds.eq(9).text(), 10)
			});
		}
	});
}

$("#50").click();
var data = [],
	timer = setInterval(function()
	{
		var next = $("#strani a:contains(›)");
		fetch();
		if (next.length)
		{
			next.click();
		}
		else
		{
			clearInterval(timer);
			console.log(data);
			$("<textarea/>")
				.css({
					position: "absolute",
					top:      322,
					left:     209,
					width:    "600px",
					height:   "400px",
					zIndex:   9999
				})
				.val(JSON.stringify(data))
				.appendTo("body")
				[0].select();
		}
	}, 1000);
