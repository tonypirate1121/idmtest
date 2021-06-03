<template>
    <b-modal id="addNewuser" class="fr-full-screen" ref="fsModal" cancel-variant="outline-secondary" @keydown.enter.native.prevent="saveForm">

        <div slot="modal-header" class="d-flex w-100 h-100">
            <h5 class="modal-title align-self-center text-center">{{title}}</h5>
            <button type="button" aria-label="Close" class="close" @click="hideModal"><i class="fa fa-times"></i></button>
        </div>

        <!-- Add required user info, similar with add user in /openidm/admin-->
        <b-container>
            <b-row>
                <b-col sm="8" offset-sm="2">
                    <b-form style="flex-direction: column;" class="mb-3 fr-edit-personal-form" name="edit-personal-form">
                            <b-form-group style="min-width: 200px;"
                                id="input-group-1"
                                label="Email address:"
                                label-for="input-1"
                                description="We'll never share your email with anyone else.">
                                <b-form-input
                                id="input-1"
                                v-model="form.mail"
                                :state= vaildcheck.mail.status
                                type="email"
                                placeholder="Enter email"
                                required
                                ></b-form-input>
                                <b-form-invalid-feedback :state= false>{{requirement.mail}}</b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group style="min-width: 200px;"
                                id="input-group-2"
                                label="User Name:"
                                label-for="input-2">
                                <b-form-input
                                id="input-2"
                                v-model="form.userName"
                                :state= vaildcheck.userName.status
                                type="username"
                                placeholder="Enter Username"
                                required
                                ></b-form-input>
                                <b-form-invalid-feedback :state= false>{{requirement.userName}}</b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group style="min-width: 200px;"
                                id="input-group-3"
                                label="First Name:"
                                label-for="input-3">
                                <b-form-input
                                id="input-3"
                                v-model="form.givenName"
                                :state= vaildcheck.givenName.status
                                type="email"
                                placeholder="Enter First Name"
                                required
                                ></b-form-input>
                                <b-form-invalid-feedback :state= false>{{requirement.givenName}}</b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group style="min-width: 200px;"
                                id="input-group-4"
                                label="Last Name:"
                                label-for="input-4">
                                <b-form-input
                                id="input-4"
                                v-model="form.sn"
                                :state= vaildcheck.sn.status
                                type="sn"
                                placeholder="Enter Last Name"
                                required
                                ></b-form-input>
                                <b-form-invalid-feedback :state= false>{{requirement.sn}}</b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group style="min-width: 200px;"
                                id="input-group-5"
                                label="Password:"
                                label-for="input-5"
                                description="At least 8 characters, 1 capital letters and 1 numbers">
                                <b-form-input
                                id="input-5"
                                v-model="form.password"
                                :state= vaildcheck.password.status
                                type="password"
                                placeholder="Enter password"
                                required
                                ></b-form-input>
                                <b-form-invalid-feedback :state= false>{{requirement.password}}</b-form-invalid-feedback>
                            </b-form-group>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>

        <div slot="modal-footer" class="w-100">
            <div class="float-right">
                <b-btn variant="outline-secondary" @click="hideModal">{{$t('common.form.cancel')}}</b-btn>
                <b-btn type="button" variant="primary" @click="saveForm">{{$t('common.form.saveChanges')}}</b-btn>
            </div>
        </div>
    </b-modal>
</template>

<script>
    //  import _ from 'lodash';
    //  import ValidationError from '@/components/utils/ValidationError';
    import _ from 'lodash';
    import ResourceMixin from '@/components/utils/mixins/ResourceMixin';

    /**
     * @description Add new managed user with required information(similar with add user in /openidm/admin) and when user enter invaild content
     * This form can get the error code from IDM backend and show under the label.
     * @fires Post  /managed/user?_action=create - Create a user
     * @fires Post  /policy/managed/user/test?_action=validateObject - verify policy
     */
    export default {
        name: 'Add-New-User',
        mixins: [
            ResourceMixin
        ],
        computed: {
            validation () {
                return true;
            }
        },
        data () {
            return {
                title: 'Add New User',
                form: {
                    mail: '',
                    userName: '',
                    givenName: '',
                    sn: '',
                    password: ''
                },
                vaildcheck: {
                    mail: {
                        status: true,
                        policyRequirements: [],
                        count: 0
                    },
                    userName: {
                        status: true,
                        policyRequirements: [],
                        count: 0
                    },
                    givenName: {
                        status: true,
                        policyRequirements: [],
                        count: 0
                    },
                    sn: {
                        status: true,
                        policyRequirements: [],
                        count: 0
                    },
                    password: {
                        status: true,
                        policyRequirements: [],
                        count: 0
                    }
                },
                requirement: {
                    mail: '',
                    userName: '',
                    givenName: '',
                    sn: '',
                    password: ''
                },
                response: {}
            };
        },
        methods: {
            hideModal () {
                this.$refs.fsModal.hide();
            },
            saveForm () {
                /* istanbul ignore next */
                // clear error information
                for (var clean in this.requirement) {
                    this.requirement[clean] = '';
                    console.log(this.requirement[clean]);
                }
                _.each(this.vaildcheck, (clean) => {
                    clean.status = true;
                    clean.count = 0;
                    clean.policyRequirements = [];
                });
                let policycheck = this.getRequestService();
                // verify policy
                policycheck.post('policy/managed/user/test?_action=validateObject', this.form).then((policyResult) => {
                    if (policyResult.data.failedPolicyRequirements.length === 0) {
                        let idmInstance = this.getRequestService();
                        // Create new user
                        idmInstance.post(`managed/user?_action=create`, this.form).then((apiresponse) => {
                            this.response = apiresponse;
                            console.log(apiresponse);
                            console.log(this.response.status);
                            this.form = {};
                            this.hideModal();
                        });
                    } else {
                        // Get error info
                        _.each(policyResult.data.failedPolicyRequirements, (policy) => {
                            this.vaildcheck[policy.property].status = false;
                            this.vaildcheck[policy.property].policyRequirements[this.vaildcheck[policy.property].count] = policy.policyRequirements[0].policyRequirement;
                            this.vaildcheck[policy.property].count = this.vaildcheck[policy.property].count + 1;
                        });
                        // show error info
                        for (var key in this.vaildcheck) {
                            _.each(this.vaildcheck[key].policyRequirements, (require) => {
                                this.requirement[key] += this.$t(`common.policyValidationMessages.${require}`) + '；\xa0';
                                console.log(key);
                                console.log(this.requirement[key]);
                            });
                        }
                        console.log('finish each');
                    }
                });
                // console.log(this.response);
                // this.hideModal();
            }
        }
    };
</script>

<style lang="scss">
    @import '../../scss/full-screen-modal';

    _:-ms-fullscreen, :root {
        #addNewuser {
            .row {
                min-width: 900px;
            }
            .fr-edit-personal-form {
                min-width: 900px;
            }
        }
    }

    @media only screen and (max-width: 700px) {
        _:-ms-fullscreen, :root {
            #addNewuser {
                .row {
                    min-width: 200px;
                }
                .fr-edit-personal-form {
                    min-width: 200px;
                }
            }
        }

    }
</style>
