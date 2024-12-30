from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, "products/index.html")


def product(request):
    return render(request, "products/product.html")


def cart(request):
    return render(request, "products/cart.html")


def checkout(request):
    return render(request, "products/checkout.html")


def checkout_shipping(request):
    return render(request, "products/checkout-shipping.html")


def checkout_payment(request):
    return render(request, "products/checkout-payment.html")


def login(request):
    return render(request, "products/login.html")


def register(request):
    return render(request, "products/register.html")


def forgotten_password(request):
    return render(request, "products/forgotten-password.html")
