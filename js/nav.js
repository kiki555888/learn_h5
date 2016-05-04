function copyFormFields() {
	$("input[name=home_zip]").val($("#home_zip_code").val()), $("input[name=home_year_built]").val($("#home_year").val()), $("[name=construction_type]").val($("#construction").val()), $("[name=primary_residence]").val($("#primary").is(":checked") ? "Yes" : "No"), $("[name=alarm_system]").val($("#alarm").is(":checked") ? "Yes" : "No"), $("[name=home_new_roof]").val($("#home_new_roof").is(":checked") ? "Yes" : "No"), $("input[name=coverage_amount]").val($("#amount").val()), $("input[name=condo_zip]").val($("#condo_zip_code").val()), $("input[name=condo_year_built]").val($("#condo_year").val()), $("[name=condo_primary_residence]").val($("#condo_primary").is(":checked") ? "Yes" : "No"), $("[name=condo_new_roof]").val($("#condo_new_roof").is(":checked") ? "Yes" : "No"), $("input[name=interior_improvements]").val($("#condo_interior_improvements").val()), $("input[name=personal_contents]").val($("#condo_personal_contents").val())
}
$(function() {
	$(".print_link").click(function(a) {
		a.preventDefault();
		var b = $(this).parents(".the_content").find(".lowest_rate").text(),
			c = $(this).parents(".the_content").find(".all_rates").html().replace(/\s+<div[\s\S]+/gm, ""),
			d = $(this).prop("href") + "?lowest=" + encodeURIComponent(window.btoa(b)) + "&list=" + encodeURIComponent(window.btoa(c)),
			e = window.open(d, "", "height=600,width=900");
		return window.focus && e.focus(), !1
	});
	var a, b = $(".quoter_form"),
		c = !0;
	if (b.length) {
		var d = window.location.pathname.split("/get-a-quote/");
		d[1] && (a = d[1]), $("body").hasClass("mainQuoter") && $("#zipcode").focus(), $(".quoter_close").click(function(a) {
			a.preventDefault(), $(".quoter_contain").removeClass("quoter--open step_one--on auto--on moto--on home--on condo--on step_two--on step_three--on step_thanks--on")
		}), $(".start_quoter").click(function(b) {
			b.preventDefault(), c = !0, $(".quoter_contain").addClass("home" == a ? "quoter--open step_two--on home--on" : "condo" == a ? "quoter--open step_two--on condo--on" : "auto" == a ? "quoter--open step_two--on auto--on" : "motorcycle" == a ? "quoter--open step_two--on moto--on" : "quoter--open step_one--on")
		}), $(".quoter_home").click(function(b) {
			b.preventDefault(), a = "home", $(".quoter_contain").removeClass("step_one--on"), $(".quoter_contain").addClass("step_two--on home--on")
		}), $(".home_step_two .next").click(function(a) {
			a.preventDefault(), copyFormFields(), $("#home_live_quotes").submit()
		}), $(".home_step_three .next").click(function(a) {
			a.preventDefault(), $("#home_quoter_form").trigger("submit")
		}), $(".quoter_auto").click(function(b) {
			b.preventDefault(), a = "auto", $(".quoter_contain").removeClass("step_one--on"), $(".quoter_contain").addClass("auto--on")
		}), $(".quoter_condo").click(function(b) {
			b.preventDefault(), a = "condo", $(".quoter_contain").removeClass("step_one--on"), $(".quoter_contain").addClass("step_two--on condo--on")
		}), $(".condo_step_two .next").click(function(a) {
			a.preventDefault(), copyFormFields(), $("#condo_live_quotes").submit()
		}), $(".condo_step_three .next").click(function(a) {
			a.preventDefault(), $("#condo_quoter_form").trigger("submit")
		}), $(".quoter_moto").click(function(b) {
			b.preventDefault(), a = "motorcycle", $(".quoter_contain").removeClass("step_one--on"), $(".quoter_contain").addClass("moto--on")
		}), $(".quoter_nav .return_step_one").click(function(a) {
			a.preventDefault(), $(".quoter_contain").removeClass("home--on condo--on step_two--on"), $(".quoter_contain").addClass("step_one--on")
		}), $(".quoter_nav .return_step_two").click(function() {
			e.preventDefault(), $(".quoter_contain").removeClass("step_three--on"), $(".quoter_contain").addClass("step_two--on")
		}), $(".year_built").on("change", function() {
			$(this).val() >= 2002 ? $(this).parents("form").find(".new_roof").prop("checked", "checked") : $(this).parents("form").find(".new_roof").prop("checked", !1)
		}), $(".live_quote").on("submit", function(b) {
			b.preventDefault();
			var d = $(this);
			d.find(".next").attr("value", "processing").addClass("processing").attr("disabled", "disabled"), d.find(".error_message").text("").fadeOut("fast"), $.ajax({
				type: "POST",
				cache: !1,
				url: "/get-a-quote/api/" + a,
				data: d.serializeArray(),
				dataType: "json",
				error: function(b, e, f) {
					if (500 != b.status) return c = !1, d.find(".error_message").text(f).fadeIn("fast"), d.find(".next").attr("value", "next").removeClass("processing").removeAttr("disabled"), !1;
					c = !1;
					var g = $("<p>", {
						"class": "error_message"
					}).append(f);
					$("." + a + "_step_three .loading_rates").slideUp("fast", function() {
						$("." + a + "_step_three .live_rates").before(g), $(".quoter_contain").removeClass("step_two--on"), $(".quoter_contain").addClass("step_three--on")
					})
				},
				success: function(b) {
					$(".quoter_contain").removeClass("step_two--on"), $(".quoter_contain").addClass("step_three--on");
					var c = Math.ceil(b.allRates.length / 2),
						d = b.allRates.splice(0, c),
						e = b.allRates,
						f = $("<ul>"),
						g = $("<ul>", {
							"class": "last"
						});
					$.each(d, function(a, b) {
						f.append($("<li>", {
							html: b.company + ": <span>$" + b.premium.toFixed(0).replace(/(\d)(?=(\d{3})+\.?)/g, "$1,") + "</span>"
						}))
					}), $.each(e, function(a, b) {
						g.append($("<li>", {
							html: b.company + ": <span>$" + b.premium.toFixed(0).replace(/(\d)(?=(\d{3})+\.?)/g, "$1,") + "</span>"
						}))
					}), $("[name=api_response]").val(b.fullResponse), $("." + a + "_step_three .all_rates").prepend(g).prepend(f), $("." + a + "_step_three .lowest_rate").text(b.lowestRate), $("." + a + "_step_three .loading_rates").slideUp("fast", function() {
						$("." + a + "_step_three .live_rates").slideDown("fast")
					})
				}
			}).done(function() {
				isFormReady = !0, $(".home_step_thanks, .condo_step_thanks").show()
			})
		}), $("#home_quoter_form, #condo_quoter_form").on("submit", function() {
			var a = $(this).find("[name=phone]"),
				b = $(this).find("[name=email]");
			return 0 === a.val().length && 0 === b.val().length ? ($(this).children(".error_message").fadeIn("fast"), !1) : ($(this).children(".error_message").fadeOut("fast"), $(".quoter_contain").removeClass("step_three--on"), $(".quoter_contain").addClass("step_thanks--on"), !0)
		})
	}
	$(".all_toggle").click(function(a) {
		a.preventDefault(), $(".quoter_contain").toggleClass("all_rates--on")
	})
}), $(function() {
	function a() {
		var a = $(this).scrollTop();
		Math.abs(c - a) <= d || (a > c && a > e ? $("header.global").addClass("nav--hide") : a + $(window).height() < $(document).height() && $("header.global").removeClass("nav--hide"), c = a)
	}
	$(".nav_trigger").click(function() {
		$("header.global").addClass("nav--on")
	}), $(".nav_close").click(function() {
		$("header.global").removeClass("nav--on")
	}), $(".site_nav h3").click(function(a) {
		$(".site_nav").toggleClass("nav--open"), a.preventDefault()
	}), $(".locations_nav h3").click(function(a) {
		$(".locations_nav").toggleClass("nav--open"), a.preventDefault()
	}), $(".products_nav h3").click(function(a) {
		$(".products_nav").toggleClass("nav--open"), a.preventDefault()
	}), $(function() {
		$("select.custom").customSelect()
	});
	var b, c = 0,
		d = 5,
		e = $("header.global").outerHeight();
	$(window).scroll(function() {
		b = !0
	}), setInterval(function() {
		b && (a(), b = !1)
	}, 250), $(".flexslider").flexslider({
		animation: "slide",
		slideshow: !1,
		animationLoop: !1,
		directionNav: !1,
		controlsContainer: ".the_slider .contain"
	}), $(".popup-video").magnificPopup({
		disableOn: 700,
		type: "iframe",
		mainClass: "mfp-fade",
		removalDelay: 160,
		preloader: !1,
		fixedContentPos: !1
	}), $(".popup-modal").magnificPopup({
		type: "inline",
		mainClass: "mfp-fade",
		removalDelay: 160,
		preloader: !1,
		modal: !0,
		fixedContentPos: !1
	}), $("#locationDetail").length && -1 != window.location.href.search("/?ratings") && $(".popup-modal").trigger("click"), $(".locations_triggers li").click(function(a) {
		$(".locations_triggers li").removeClass("active"), $(this).addClass("active"), $(".locations_block").addClass("locations--open"), a.preventDefault()
	}), $(".locations_triggers li.bonita_springs").click(function(a) {
		$(".location_card").removeClass("location--on"), $("#bonita-springs").addClass("location--on"), a.preventDefault()
	}), $(".locations_triggers li.cape_coral").click(function(a) {
		$(".location_card").removeClass("location--on"), $("#cape-coral").addClass("location--on"), a.preventDefault()
	}), $(".locations_triggers li.delray").click(function(a) {
		$(".location_card").removeClass("location--on"), $("#delray").addClass("location--on"), a.preventDefault()
	}), $(".locations_triggers li.estero").click(function(a) {
		$(".location_card").removeClass("location--on"), $("#estero").addClass("location--on"), a.preventDefault()
	}), $(".locations_triggers li.fort_myers").click(function(a) {
		$(".location_card").removeClass("location--on"), $("#fort-myers").addClass("location--on"), a.preventDefault()
	}), $(".locations_triggers li.sarasota").click(function(a) {
		$(".location_card").removeClass("location--on"), $("#sarasota").addClass("location--on"), a.preventDefault()
	}), $(".locations_triggers li.viera").click(function(a) {
		$(".location_card").removeClass("location--on"), $("#viera").addClass("location--on"), a.preventDefault()
	}), $(".people_sort li").click(function(a) {
		$(this).toggleClass("toggle--on"), a.preventDefault()
	}), $(".people_sort li.corporate-team_toggle").click(function(a) {
		$(".team_corporate-team").toggleClass("toggle--on"), a.preventDefault()
	}), $(".people_sort li.cape-coral_toggle").click(function(a) {
		$(".team_cape-coral").toggleClass("toggle--on"), a.preventDefault()
	}), $(".people_sort li.estero_toggle").click(function(a) {
		$(".team_estero").toggleClass("toggle--on"), a.preventDefault()
	}), $(".people_sort li.sarasota_toggle").click(function(a) {
		$(".team_sarasota").toggleClass("toggle--on"), a.preventDefault()
	}), $(".people_sort li.bonita-springs_toggle").click(function(a) {
		$(".team_bonita-springs").toggleClass("toggle--on"), a.preventDefault()
	}), $(".people_sort li.delray_toggle").click(function(a) {
		$(".team_delray").toggleClass("toggle--on"), a.preventDefault()
	}), $(".people_sort li.fort-myers_toggle").click(function(a) {
		$(".team_fort-myers").toggleClass("toggle--on"), a.preventDefault()
	}), $(".people_sort li.viera_toggle").click(function(a) {
		$(".team_viera").toggleClass("toggle--on"), a.preventDefault()
	})
});