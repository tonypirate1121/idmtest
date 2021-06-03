<template>
  <div>
        <b-col lg="6" class="my-1">
        <b-form-group
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
        <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-button ref="editProfileButton" variant="primary" block class="mt-4" v-b-modal.addNewuser>
        {{'Add New User'}}
        </b-button>
        <fr-add-newuser></fr-add-newuser>
      </b-col>
    <b-table striped hover :items="result" :fields="fields" :filter="filter"></b-table>
  </div>
</template>

<script>
    import ListGroup from '@/components/utils/ListGroup';
    import ListItem from '@/components/utils/ListItem';
    import EditPersonalInfo from '@/components/profile/EditPersonalInfo';
    import AddNewuser from '@/components/manageuser/AddNewuser';

    export default {
        name: 'ManageuserTable',
        components: {
            'fr-list-group': ListGroup,
            'fr-edit-personal-info': EditPersonalInfo,
            'fr-add-newuser': AddNewuser,
            'fr-list-item': ListItem
        },
        data () {
            return {
                result: [],
                fields: [
                    {
                        key: '_id',
                        sortable: true
                    },
                    {
                        key: 'mail',
                        sortable: true
                    },
                    {
                        key: 'userName',
                        sortable: true
                    },
                    {
                        key: 'sn',
                        sortable: true
                    },
                    {
                        key: 'givenName',
                        sortable: true
                    }
                ],
                filter: null
            };
        },
        mounted () {
            this.loaduserData();
        },
        methods: {
            loaduserData () {
                this.getRequestService().get('managed/user?_queryId=query-all&_fields=mail,_id,userName,sn,givenName')
                    .then(({data}) => {
                        this.result = data.result;
                        console.log(this.result);
                    })
                    .catch((error) => {
                        this.displayNotification('error', error.response.data.message);
                    });
            }
        }
};
</script>