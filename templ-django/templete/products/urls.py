from django.urls import path
from . import views

urlpatterns = [
    path("index", views.index, name="index"),
    path("product", views.product, name="product"),
    path("cart", views.cart, name="cart"),
    path("checkout", views.checkout, name="checkout"),
    path("checkout-shipping", views.checkout_shipping, name="checkout-shipping"),
    path("checkout-payment", views.checkout_payment, name="checkout-payment"),
    path("login", views.login, name="login"),
    path("register", views.register, name="register"),
    path("forgotten-password", views.forgotten_password, name="forgotten-password"),
]
