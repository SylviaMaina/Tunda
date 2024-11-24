<template>
  <div v-if="user">
    <div
      style="
        width: 90%;
        margin: 0 auto;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <div
        style="
          width: 50%;
          height: 5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div
          style="
            width: 70%;
            display: flex;
            flex-direction: column;
            align-items: start;
          "
        >
          <h6
            class="no-margin no-padding"
            style="font-size: 18px; font-weight: 600"
          >
            My Profile
          </h6>
        </div>
      </div>
      <q-icon color="dark" name="o_notifications" size="30px" />
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin: 0 auto;

        justify-content: space-between;
      "
    >
      <div style="position: relative">
        <q-img
          :src="
            user.photos[0]?.saved_file_name
              ? `http://212.47.72.98:3001/api/v1/media/file/?file_path=${user.photos[0]?.saved_file_name}`
              : '../../assets/Asset 1 1.png'
          "
          alt="tunda app"
          style="
            width: 5rem;
            height: 5rem;
            border-radius: 100%;
            object-fit: cover;
          "
        >
        </q-img>
        <router-link to="/editimages">
          <q-icon
            class="absolute all-pointer-events q-pa-xs bg-red"
            size="1rem"
            name="edit"
            color="black"
            style="bottom: 0.2rem; right: 0rem; border-radius: 100%"
        /></router-link>
      </div>

      <h6 style="font-size: 18px; font-weight: 600">
        {{ user.full_name }}
      </h6>
      <div
        style="
          display: flex;
          align-items: center;
          width: 10rem;
          justify-content: space-between;
        "
      >
        <h6
          class="text-subtitle2 text-grey q-my-sm"
          style="border-right: 1px solid #bababa; padding-right: 0.3rem"
        >
          {{ calculateAge(user.dob) }} years old
        </h6>
        <div style="display: flex; align-items: center">
          <q-icon name="location_on" color="grey-5" />
          <h6 class="text-subtitle2 text-grey">Nairobi</h6>
        </div>
      </div>
    </div>
    <router-link to="/premium" style="text-decoration: none; color: black">
      <q-item
        style="width: 90%; border-radius: 0.5rem; margin: 0 auto"
        class="q-mx-lg q-my-sm bg-white q-gutter-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar style="width: 2rem">
          <q-icon size="32px" name="diamond" color="red" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Get unlimited features</q-item-label>
          <q-item-label caption lines="3"
            >Get premium today and enjoy unlimited access. Sign up to Tunda
            premium</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label>
            <q-icon name="chevron_right" color="dark" size="20px" />
          </q-item-label>
        </q-item-section> </q-item
    ></router-link>

    <div
      style="
        width: 90%;
        border-radius: 0.5rem;
        margin: auto;
        overflow: auto;
        height: 28rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      "
      class="q-mx-lg q-my-lg bg-white q-gutter-sm"
    >
      <q-list padding>
        <router-link to="/personal" style="text-decoration: none; color: black">
          <q-item>
            <q-item-section avatar style="width: 2rem">
              <q-icon size="20px" name="eva-person-outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Personal details</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-icon
                  name="chevron_right"
                  class="q-pl-sm"
                  color="dark"
                  size="1.5rem"
                />
              </q-item-label>
            </q-item-section> </q-item
        ></router-link>
        <router-link
          to="/changepassword"
          style="text-decoration: none; color: black"
        >
          <q-item>
            <q-item-section avatar style="width: 2rem">
              <q-icon size="20px" name="eva-eye-outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Change password</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-icon
                  name="chevron_right"
                  class="q-pl-sm"
                  color="dark"
                  size="1.5rem"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
        <router-link
          to="/notifications"
          style="text-decoration: none; color: black"
        >
          <q-item>
            <q-item-section avatar style="width: 2rem">
              <q-icon size="20px" name="o_notifications" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Notifications</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-icon
                  name="chevron_right"
                  class="q-pl-sm"
                  color="dark"
                  size="1.5rem"
                />
              </q-item-label>
            </q-item-section> </q-item
        ></router-link>
        <router-link to="/terms" style="text-decoration: none; color: black">
          <q-item>
            <q-item-section avatar style="width: 2rem">
              <q-icon size="20px" name="eva-globe-outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Terms and Conditions</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-icon
                  name="chevron_right"
                  class="q-pl-sm"
                  color="dark"
                  size="1.5rem"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
        <router-link to="privacy" style="text-decoration: none; color: black">
          <q-item>
            <q-item-section avatar style="width: 2rem">
              <q-icon size="20px" name="o_description" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Privacy policy</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-icon
                  name="chevron_right"
                  class="q-pl-sm"
                  color="dark"
                  size="1.5rem"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
        <router-link to="/aboutus" style="text-decoration: none; color: black">
          <q-item>
            <q-item-section avatar style="width: 2rem">
              <q-icon size="20px" name="eva-eye-outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label>About Us</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-icon
                  name="chevron_right"
                  class="q-pl-sm"
                  color="dark"
                  size="1.5rem"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
        <router-link to="/contact" style="text-decoration: none; color: black">
          <q-item>
            <q-item-section avatar style="width: 2rem">
              <q-icon size="20px" name="eva-question-mark-circle-outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Support</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-icon
                  name="chevron_right"
                  class="q-pl-sm"
                  color="dark"
                  size="1.5rem"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
        <q-item>
          <q-item-section avatar style="width: 2rem">
            <q-icon size="20px" name="o_logout" />
          </q-item-section>

          <q-item-section @click="Logout">
            <q-item-label>Logout</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label>
              <q-icon
                name="chevron_right"
                class="q-pl-sm"
                color="dark"
                size="1.5rem"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import AuthSession from "app/Storage/AuthSession";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const Logout = () => {
  AuthSession.logOut();
  router.push("/login");
};
</script>

<style lang="scss" scoped></style>
