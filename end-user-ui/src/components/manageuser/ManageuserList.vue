<template>
    <fr-list-group :title="$t('pages.test.title')" :subtitle="$t('pages.test.subtitle')">
        <fr-list-item v-for="x in testapicall2.result" :key="x"
            :collapsible="false"
            :panelShown="false">

            <div slot="list-item-header" class="d-inline-flex w-180">
                <h6 class="card-body py-4">Email:{{x.mail}}</h6><br>
                <h6 class="card-body py-4">Lastname:{{x.sn}}</h6><br>
                <h6 class="card-body py-4">Firstname:{{x.givenName}}</h6><br>
                <div class="ml-auto">

                </div>
            </div>

        </fr-list-item>
    </fr-list-group>
</template>

<script>
    import _ from 'lodash';
    import ListGroup from '@/components/utils/ListGroup';
    import ListItem from '@/components/utils/ListItem';

    /**
     * @description Displays managed user in a list.
     *
     */
    export default {
        name: 'ManageuserList',
        components: {
            'fr-list-group': ListGroup,
            'fr-list-item': ListItem
        },
        data () {
            return {
                testapicall2: {}
            };
        },
        mounted () {
            this.loadwidgetData();
        },
        methods: {
            loadwidgetData () {
                this.getRequestService().get('managed/user?_queryId=query-all')
                    .then(({data}) => {
                        console.log(data);
                        this.testapicall2 = data;
                    })
                    .catch((error) => {
                        this.displayNotification('error', error.response.data.message);
                    });
            }
        },
        computed: {
            fullName () {
                let fullName = '';
                if (this.$root.userStore.state.givenName.length > 0 || this.$root.userStore.state.sn.length > 0) {
                    fullName = _.startCase(this.$root.userStore.state.givenName + ' ' + this.$root.userStore.state.sn);
                } else {
                    fullName = this.$root.userStore.state.userId;
                }

                return fullName;
            },
            email () {
                return this.$root.userStore.state.email;
            }
        }
    };
</script>

<style scoped>
</style>

