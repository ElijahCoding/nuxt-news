<template>
  <p>login</p>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';

    export default {
        middleware: 'auth',
        mixins: [validationMixin],

        data () {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },

        validations: {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(20)
                }
            }
        },

        computed: {
            loading () {
                return this.$store.getters.loading;
            },

            isAuthenticated () {
                return this.$store.getters.isAuthenticated;
            }
        },

        watch: {
            isAuthenticated (value) {
                if (value) {
                    setTimeout(() => this.$router.push('/'), 2000);
                }
            }
        },

        methods: {
            validateForm () {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.registerUser();
                }
            },

            async registerUser () {
                await this.$store.dispatch('authenticateUser', {
                    email: this.form.email,
                    password: this.form.password,
                    returnSecureToken: true
                });
            },

            getValidationClass (fieldName) {
                const field = this.$v.form[fieldName];

                if (field) {
                    return {
                        "md-invalid": field.$invalid && field.$dirty
                    }
                }
            }
        }
    }
</script>
