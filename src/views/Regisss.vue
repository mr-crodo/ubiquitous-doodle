<template>
  <div class="form-wrap">
    <div class="container-xl">
      <div class="col-12">
        <div class="d-flex justify-content-end">
          <p>Или вы можете</p>
          <router-link class="router__link" :to="{ name: 'Login' }">Вход</router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="d-flex align-items-center justify-content-center h-100">
          <div class="col-6">
            <div class="img__block d-flex">
            </div>
          </div>
          <div class="col-6 d-flex align-items-center ju">
            <form class="register">
              <h3>Регистрация</h3>
              <div class="inputs">
                <div class="input d-flex flex-column">
                  <label>Email адрес <span>*</span></label>
                  <div class="d-flex">
                    <input type="text" placeholder="Введите Email" v-model="email" />
                    <help class="icon" />
                  </div>
                </div>
                <div class="input d-flex flex-column">
                  <label>Номер телефона</label>
                  <div class="d-flex">
                    <input type="text" placeholder="+994 " v-model="number" />
                    <help class="icon" />
                  </div>
                </div>
                <div class="input d-flex flex-column">
                  <label>Имя</label>
                  <div class="d-flex">
                    <input type="text" placeholder="Введите имя" v-model="username" />
                    <help class="icon" stroke="#A673D8" />
                  </div>
                </div>
                <div class="input d-flex flex-column">
                  <label>Повторите пароль<span>*</span></label>
                  <div class="d-flex">
                    <input type="password" placeholder="Введите пароль" v-model="password" />
                    <eye class="icon" @click:append="showPassword = !showPassword" />
                  </div>
                </div>
                <div class="input d-flex flex-column">
                  <label>Задайте пароль<span>*</span></label>
                  <div class="d-flex">
                    <input type="text" placeholder="Введите пароль" v-model="password" />
                    <eye class="icon"
                         id="password"
                         label="Confirm Password"
                         name="confirm-password"
                         prepend-inner-icon="mdi-lock"
                         :counter="6"
                         v-model="confirmPassword"
                         :rules="confirmPasswordRules"
                         :append-icon="showPassword ? 'eye' : 'eye-off'"
                         :type="showPassword ? 'text' : 'password'"
                         @click:append="showPassword = !showPassword"
                    />
                  </div>
                </div>
                <div v-show="error" class="error">{{ this.errorMsg }}</div>
              </div>
              <button @click.prevent="register">Sign Up</button>
              <div class="angle"></div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>