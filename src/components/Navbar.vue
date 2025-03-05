<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <img class="navbar-brand" src="../assets/logo.png"/>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <slot></slot>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: #333333;
    height: 5vh;
}

img {
    width: 7vw;
}
</style>